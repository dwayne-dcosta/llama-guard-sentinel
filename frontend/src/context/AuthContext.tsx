import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface UserAccount {
  id: string;
  email: string;
  fullName: string;
  role: 'operator' | 'admin' | 'security_auditor' | 'ml_engineer';
  passwordHash: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface SessionRecord {
  sessionId: string;
  userId: string;
  email: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  status: 'active' | 'revoked' | 'expired';
}

export interface EdgeGuardrailAccess {
  id: string;
  operatorEmail: string;
  sentinelGatewayToken: string;
  basetenApiKey: string;
  isUnlocked: boolean;
  updatedAt: string;
}

export interface AuthContextType {
  user: UserAccount | null;
  sessions: SessionRecord[];
  currentSession: SessionRecord | null;
  guardrails: EdgeGuardrailAccess | null;
  allGuardrails: EdgeGuardrailAccess[];
  isDashboardUnlocked: boolean;
  isLoading: boolean;
  signUp: (params: { email: string; fullName: string; password: string; role?: UserAccount['role'] }) => Promise<{ success: boolean; message: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signOut: () => void;
  saveGuardrails: (sentinelToken: string, basetenKey: string) => { success: boolean; message: string };
  revokeGuardrails: () => void;
  revokeSession: (sessionId: string) => void;
  seedDemoAccount: () => void;
}

const STORAGE_KEYS = {
  USERS: 'auth_users_directory',
  SESSIONS: 'auth_session_tracking_matrix',
  CURRENT_USER_ID: 'auth_active_operator_id',
  GUARDRAILS: 'auth_edge_guardrails',
} as const;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper for generating secure client-side pseudorandom tokens
const generateId = (prefix: string = 'id'): string => {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [currentSession, setCurrentSession] = useState<SessionRecord | null>(null);
  const [allGuardrails, setAllGuardrails] = useState<EdgeGuardrailAccess[]>([]);
  const [guardrails, setGuardrails] = useState<EdgeGuardrailAccess | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and synchronize state with localStorage on mount
  useEffect(() => {
    try {
      // 1. Load users directory
      const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      let usersList: UserAccount[] = rawUsers ? JSON.parse(rawUsers) : [];

      // Pre-seed demo operator if storage is completely pristine
      if (usersList.length === 0) {
        const defaultOperator: UserAccount = {
          id: 'usr_ops_alpha_01',
          email: 'operator@sentinel-matrix.internal',
          fullName: 'Major Alex Vance',
          role: 'operator',
          passwordHash: 'SentinelPass2026!',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };
        usersList = [defaultOperator];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(usersList));
      }

      // 2. Load sessions matrix
      const rawSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      const sessionList: SessionRecord[] = rawSessions ? JSON.parse(rawSessions) : [];
      setSessions(sessionList);

      // 3. Load guardrails access records from localStorage.auth_edge_guardrails
      const rawGuardrails = localStorage.getItem(STORAGE_KEYS.GUARDRAILS);
      let guardrailList: EdgeGuardrailAccess[] = rawGuardrails ? JSON.parse(rawGuardrails) : [];

      // Pre-seed default guardrail sample if empty for quick operator evaluation
      if (guardrailList.length === 0) {
        const sampleGuardrail: EdgeGuardrailAccess = {
          id: 'grd_initial_prod',
          operatorEmail: 'operator@sentinel-matrix.internal',
          sentinelGatewayToken: 'snt_gw_live_79f18a2bc9004d81',
          basetenApiKey: 'b10_prod_9934acb8e1f04128a8d11',
          isUnlocked: true,
          updatedAt: new Date().toISOString(),
        };
        guardrailList = [sampleGuardrail];
        localStorage.setItem(STORAGE_KEYS.GUARDRAILS, JSON.stringify(guardrailList));
      }
      setAllGuardrails(guardrailList);

      // 4. Check active operator session
      const activeId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
      if (activeId) {
        const matchedUser = usersList.find((u) => u.id === activeId) || null;
        setUser(matchedUser);

        if (matchedUser) {
          // Attach relevant guardrail
          const userGuardrail = guardrailList.find((g) => g.operatorEmail === matchedUser.email) || guardrailList[0] || null;
          setGuardrails(userGuardrail);

          // Find or assign active session
          const activeSess = sessionList.find((s) => s.userId === matchedUser.id && s.status === 'active');
          if (activeSess) {
            setCurrentSession(activeSess);
          } else {
            const newSession: SessionRecord = {
              sessionId: generateId('sess'),
              userId: matchedUser.id,
              email: matchedUser.email,
              ipAddress: '127.0.0.1 (Loopback)',
              userAgent: navigator.userAgent.substring(0, 45),
              timestamp: new Date().toISOString(),
              status: 'active',
            };
            const updatedSessions = [newSession, ...sessionList];
            localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updatedSessions));
            setSessions(updatedSessions);
            setCurrentSession(newSession);
          }
        }
      }
    } catch (err) {
      console.error('Error synchronizing localStorage auth states:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync active user guardrail whenever user or allGuardrails updates
  useEffect(() => {
    if (user) {
      const activeGuardrail = allGuardrails.find((g) => g.operatorEmail === user.email) || (allGuardrails.length > 0 ? allGuardrails[0] : null);
      setGuardrails(activeGuardrail);
    } else {
      setGuardrails(null);
    }
  }, [user, allGuardrails]);

  // Sign Up Handler
  const signUp = useCallback(
    async ({
      email,
      fullName,
      password,
      role = 'operator',
    }: {
      email: string;
      fullName: string;
      password: string;
      role?: UserAccount['role'];
    }) => {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || !cleanEmail.includes('@')) {
        return { success: false, message: 'Please provide a valid operator email address.' };
      }
      if (!password || password.length < 6) {
        return { success: false, message: 'Operator credentials must be at least 6 characters.' };
      }

      const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      const usersList: UserAccount[] = rawUsers ? JSON.parse(rawUsers) : [];

      if (usersList.some((u) => u.email === cleanEmail)) {
        return { success: false, message: 'An operator account with this identifier already exists.' };
      }

      const newUser: UserAccount = {
        id: generateId('usr'),
        email: cleanEmail,
        fullName: fullName.trim() || 'Field Operator',
        role,
        passwordHash: password,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      const updatedUsers = [...usersList, newUser];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));

      // Create session
      const newSession: SessionRecord = {
        sessionId: generateId('sess'),
        userId: newUser.id,
        email: newUser.email,
        ipAddress: '127.0.0.1 (Loopback)',
        userAgent: navigator.userAgent.substring(0, 45),
        timestamp: new Date().toISOString(),
        status: 'active',
      };

      const rawSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      const currentSessions: SessionRecord[] = rawSessions ? JSON.parse(rawSessions) : [];
      const updatedSessions = [newSession, ...currentSessions];
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updatedSessions));
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, newUser.id);

      setUser(newUser);
      setSessions(updatedSessions);
      setCurrentSession(newSession);

      return { success: true, message: 'Operator credentials provisioned and active session initiated.' };
    },
    []
  );

  // Sign In Handler
  const signIn = useCallback(async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    const usersList: UserAccount[] = rawUsers ? JSON.parse(rawUsers) : [];

    const matchedUser = usersList.find((u) => u.email === cleanEmail);
    if (!matchedUser) {
      return { success: false, message: 'No registered operator found for this email address.' };
    }

    if (matchedUser.passwordHash !== password) {
      return { success: false, message: 'Invalid credential signature or secret key mismatch.' };
    }

    // Update lastLoginAt
    matchedUser.lastLoginAt = new Date().toISOString();
    const updatedUsers = usersList.map((u) => (u.id === matchedUser.id ? matchedUser : u));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));

    // Register active session
    const newSession: SessionRecord = {
      sessionId: generateId('sess'),
      userId: matchedUser.id,
      email: matchedUser.email,
      ipAddress: '127.0.0.1 (Loopback)',
      userAgent: navigator.userAgent.substring(0, 45),
      timestamp: new Date().toISOString(),
      status: 'active',
    };

    const rawSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    const currentSessions: SessionRecord[] = rawSessions ? JSON.parse(rawSessions) : [];
    const updatedSessions = [newSession, ...currentSessions];
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updatedSessions));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, matchedUser.id);

    setUser(matchedUser);
    setSessions(updatedSessions);
    setCurrentSession(newSession);

    return { success: true, message: 'Operator authorization granted.' };
  }, []);

  // Sign Out Handler
  const signOut = useCallback(() => {
    if (currentSession) {
      const rawSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      const currentSessions: SessionRecord[] = rawSessions ? JSON.parse(rawSessions) : [];
      const updated = currentSessions.map((s) => (s.sessionId === currentSession.sessionId ? { ...s, status: 'revoked' as const } : s));
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
      setSessions(updated);
    }
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    setUser(null);
    setCurrentSession(null);
  }, [currentSession]);

  // Edge Guardrail Tool Provisioning Controller
  const saveGuardrails = useCallback(
    (sentinelToken: string, basetenKey: string) => {
      const cleanSentinel = sentinelToken.trim();
      const cleanBaseten = basetenKey.trim();

      if (!cleanSentinel || cleanSentinel.length < 8) {
        return { success: false, message: 'Sentinel Gateway Secret Token must be at least 8 characters.' };
      }
      if (!cleanBaseten || cleanBaseten.length < 8) {
        return { success: false, message: 'Personal Baseten API Key must be at least 8 characters.' };
      }

      const activeEmail = user?.email || 'operator@sentinel-matrix.internal';
      const rawGuardrails = localStorage.getItem(STORAGE_KEYS.GUARDRAILS);
      const list: EdgeGuardrailAccess[] = rawGuardrails ? JSON.parse(rawGuardrails) : [];

      const existingIndex = list.findIndex((g) => g.operatorEmail === activeEmail);
      const updatedItem: EdgeGuardrailAccess = {
        id: existingIndex >= 0 ? list[existingIndex].id : generateId('grd'),
        operatorEmail: activeEmail,
        sentinelGatewayToken: cleanSentinel,
        basetenApiKey: cleanBaseten,
        isUnlocked: true,
        updatedAt: new Date().toISOString(),
      };

      let nextList: EdgeGuardrailAccess[];
      if (existingIndex >= 0) {
        nextList = [...list];
        nextList[existingIndex] = updatedItem;
      } else {
        nextList = [updatedItem, ...list];
      }

      localStorage.setItem(STORAGE_KEYS.GUARDRAILS, JSON.stringify(nextList));
      setAllGuardrails(nextList);
      setGuardrails(updatedItem);

      return { success: true, message: 'Edge guardrails validated. Dashboard route context is now unlocked.' };
    },
    [user]
  );

  const revokeGuardrails = useCallback(() => {
    if (!user) return;
    const rawGuardrails = localStorage.getItem(STORAGE_KEYS.GUARDRAILS);
    const list: EdgeGuardrailAccess[] = rawGuardrails ? JSON.parse(rawGuardrails) : [];
    const nextList = list.map((g) => (g.operatorEmail === user.email ? { ...g, isUnlocked: false, updatedAt: new Date().toISOString() } : g));
    localStorage.setItem(STORAGE_KEYS.GUARDRAILS, JSON.stringify(nextList));
    setAllGuardrails(nextList);
    if (guardrails && guardrails.operatorEmail === user.email) {
      setGuardrails({ ...guardrails, isUnlocked: false });
    }
  }, [user, guardrails]);

  const revokeSession = useCallback((sessionId: string) => {
    const rawSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    const list: SessionRecord[] = rawSessions ? JSON.parse(rawSessions) : [];
    const updated = list.map((s) => (s.sessionId === sessionId ? { ...s, status: 'revoked' as const } : s));
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
    setSessions(updated);
  }, []);

  const seedDemoAccount = useCallback(() => {
    const demoEmail = 'operator@sentinel-matrix.internal';
    signIn(demoEmail, 'SentinelPass2026!');
  }, [signIn]);

  // Route context unlock state:
  // Requires authenticated operator AND active unlocked guardrail record in localStorage.auth_edge_guardrails
  const isDashboardUnlocked = Boolean(
    user && guardrails && guardrails.isUnlocked && guardrails.sentinelGatewayToken && guardrails.basetenApiKey
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        sessions,
        currentSession,
        guardrails,
        allGuardrails,
        isDashboardUnlocked,
        isLoading,
        signUp,
        signIn,
        signOut,
        saveGuardrails,
        revokeGuardrails,
        revokeSession,
        seedDemoAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
