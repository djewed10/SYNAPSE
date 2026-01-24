# SYNAPSE Frontend - Code Examples & Usage Guide

## 1. Using the Auth Hook

```typescript
'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui';

export function MyComponent() {
  const { 
    user,           // Current logged-in user or null
    token,          // JWT token
    isLoading,      // Loading state
    isAuthenticated,// Boolean check
    error,          // Error message
    login,          // Function: (email, password) => Promise
    register,       // Function: (email, password, firstName, lastName) => Promise
    logout          // Function: () => Promise
  } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.firstName}!</p>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

## 2. Using the RBAC Hook

```typescript
'use client';

import { useRBAC } from '@/hooks/useRBAC';
import { Button } from '@/components/ui';

export function AdminPanel() {
  const { 
    user,
    isAdmin,                    // Check if user is admin
    isTeacher,                  // Check if user is teacher
    isStudent,                  // Check if user is student
    hasRole,                    // hasRole(roleName)
    hasAnyRole,                 // hasAnyRole(['admin', 'teacher'])
    hasAllRoles,                // hasAllRoles(['admin', 'teacher'])
    canAccess                   // canAccess('permission:name')
  } = useRBAC();

  if (!isAdmin()) {
    return <div>Access Denied</div>;
  }

  return <div>Admin only content</div>;
}
```

## 3. Using API Services

```typescript
'use client';

import { useState } from 'react';
import { authService } from '@/services/api/auth.service';
import { qcmsService } from '@/services/api/qcms.service';
import { statisticsService } from '@/services/api/statistics.service';

export function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch current user
  const loadUser = async () => {
    try {
      setIsLoading(true);
      const user = await authService.getCurrentUser();
      console.log('Current user:', user);
    } catch (err) {
      setError('Failed to load user');
    } finally {
      setIsLoading(false);
    }
  };

  // Get QCM questions for a lesson
  const loadQuestions = async (lessonId: string) => {
    try {
      const questions = await qcmsService.getLessonQuestions(lessonId);
      console.log('Questions:', questions);
    } catch (err) {
      setError('Failed to load questions');
    }
  };

  // Submit quiz answers
  const submitQuiz = async (lessonId: string, answers: any[]) => {
    try {
      const results = await qcmsService.submitAnswer(lessonId, answers);
      console.log('Results:', results);
    } catch (err) {
      setError('Failed to submit quiz');
    }
  };

  // Get user statistics
  const loadStats = async () => {
    try {
      const stats = await statisticsService.getMyStatistics();
      console.log('My stats:', stats);
    } catch (err) {
      setError('Failed to load statistics');
    }
  };

  return (
    <div>
      <button onClick={loadUser}>Load User</button>
      <button onClick={() => loadQuestions('lesson-1')}>Load Questions</button>
      <button onClick={() => submitQuiz('lesson-1', [])}>Submit Quiz</button>
      <button onClick={loadStats}>Load Stats</button>
    </div>
  );
}
```

## 4. Using Zustand Stores

```typescript
'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';

export function MyComponent() {
  // Auth store
  const { user, token, setUser, setToken, clearAuth } = useAuthStore();

  // UI store
  const { 
    isDarkMode, 
    sidebarOpen, 
    toggleDarkMode, 
    toggleSidebar, 
    setSidebarOpen 
  } = useUIStore();

  return (
    <div>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <button onClick={toggleSidebar}>
        Sidebar: {sidebarOpen ? 'Open' : 'Closed'}
      </button>
    </div>
  );
}
```

## 5. Using UI Components

```typescript
'use client';

import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Label,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';

export function UIExample() {
  return (
    <>
      {/* Button variants */}
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button disabled>Disabled</Button>

      {/* Input with Label */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter email" />
      </div>

      {/* Card */}
      <Card>
        <CardHeader>
          <CardTitle>My Card</CardTitle>
        </CardHeader>
        <CardContent>
          Card content goes here
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          Dialog content
        </DialogContent>
      </Dialog>
    </>
  );
}
```

## 6. Form Validation with Zod

```typescript
'use client';

import { useState } from 'react';
import { loginSchema, type LoginFormData } from '@/lib/validators';
import { Input, Button, Label } from '@/components/ui';

export function LoginForm() {
  const [data, setData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      const validated = loginSchema.parse(data);
      console.log('Valid data:', validated);
      
      // Submit to API
    } catch (error: any) {
      // Handle validation errors
      if (error.errors) {
        const errorMap: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          errorMap[err.path[0]] = err.message;
        });
        setErrors(errorMap);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
```

## 7. Using TanStack Query

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import { statisticsService } from '@/services/api/statistics.service';

export function StatisticsDisplay() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['statistics', 'me'],
    queryFn: () => statisticsService.getMyStatistics(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading statistics</div>;

  return (
    <div>
      <h2>Your Statistics</h2>
      <p>Points: {data?.totalPoints}</p>
      <p>Lessons Completed: {data?.lessonsCompleted}</p>
      <p>Accuracy: {data?.accuracy}%</p>
      <p>Level: {data?.level}</p>
    </div>
  );
}
```

## 8. WebSocket Real-time Updates

```typescript
'use client';

import { useEffect, useState } from 'react';
import { wsService } from '@/services/websocket.service';

export function NotificationListener() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Connect to WebSocket
    wsService.connect().catch(console.error);

    // Subscribe to notifications
    const unsubscribe = wsService.subscribe('notification', (data) => {
      console.log('New notification:', data);
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      unsubscribe();
      wsService.disconnect();
    };
  }, []);

  return (
    <div>
      <h3>Notifications ({notifications.length})</h3>
      {notifications.map((notif, idx) => (
        <div key={idx}>{notif.message}</div>
      ))}
    </div>
  );
}
```

## 9. Creating a Protected Page

```typescript
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/components/shared';

export default function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return null;

  return (
    <div>
      <h1>This is a protected page</h1>
    </div>
  );
}
```

## 10. Custom Hook Example

```typescript
'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { voletsService } from '@/services/api/volets.service';

export function useVolets() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['volets'],
    queryFn: () => voletsService.getAllVolets(),
  });

  const deleteVolet = useCallback(
    async (id: string) => {
      await voletsService.deleteVolet(id);
      // Optionally invalidate query to refetch
    },
    []
  );

  return {
    volets: data || [],
    isLoading,
    error,
    deleteVolet,
  };
}

// Usage
export function VoletsList() {
  const { volets, isLoading } = useVolets();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {volets.map((volet) => (
        <div key={volet.id}>{volet.title}</div>
      ))}
    </div>
  );
}
```

---

## Quick Start Command

```bash
# 1. Install dependencies
cd front-end
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# http://localhost:3000
```

All examples are ready to copy-paste into your project! 🚀
