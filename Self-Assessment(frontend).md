# Project Iteration Fixes & Improvements

This document summarizes key problems, solutions, and lessons learned during development iterations.

---

## Example 1: Routing Errors with Login & Signup Pages

### Problem Background
In **Iteration 1**, after adding `Login` and `Signup` links in the NavBar, the app failed to render these pages. The issue was that `App.jsx` didn’t include the correct routes for `/login` and `/signup`.

### Original Implementation (missing routes)
```jsx
// App.jsx (before)
<Route path="/" element={<MainLayout />}>
  <Route index element={<HomePage />} />
  <Route path="/jobs" element={<JobsPage />} />
  <Route path="/add-job" element={<AddJobPage />} />
  <Route path="/edit-job/:id" element={<EditJobPage />} />
  <Route path="/jobs/:id" element={<JobPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Route>
```

### Fixed Implementation
```jsx
// App.jsx (after)
<Route path="/" element={<MainLayout />}>
  <Route index element={<HomePage />} />
  <Route path="/jobs" element={<JobsPage />} />
  <Route path="/add-job" element={<AddJobPage />} />
  <Route path="/edit-job/:id" element={<EditJobPage />} />
  <Route path="/jobs/:id" element={<JobPage />} />

  {/* Added missing routes */}
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignupPage />} />

  <Route path="*" element={<NotFoundPage />} />
</Route>
```

### Key Improvements
- Defined explicit routes for `/login` and `/signup`.
- Ensured NavBar links matched the App route definitions.
- Verified navigation using React Router v6’s `<RouterProvider>`.

### Lessons Learned
- Updating navigation links is **not enough**—routes must also exist in `App.jsx`.
- Testing navigation immediately after adding links helps catch missing routes.

---

## Example 2: Extracting Login Logic into a Custom Hook

### Problem Background
Initially, `LoginPage.jsx` contained all login logic, including API calls and navigation. This made the component long and harder to test.

### Original Implementation (logic inside component)
```jsx
// LoginPage.jsx (before, commented out)
const handleLogin = async (credentials) => {
  const res = await fetch("/api/users/login", { ... });
  const data = await res.json();
  localStorage.setItem("authToken", data.token);
  return navigate("/");
};
```

### Fixed Implementation (custom hook)
```jsx
// useLogin.js
const login = async (credentials) => {
  const res = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  localStorage.setItem("authToken", data.token);
  navigate("/");
};

// LoginPage.jsx
const submitForm = async (e) => {
  e.preventDefault();
  await login({ email, password });
};
```

### Key Improvements
- **Separation of Concerns**: Login logic moved into `useLogin.js`.
- **Reusability**: Other components can reuse the `login` function.
- **Code Clarity**: `LoginPage` focuses on rendering UI, not handling API requests.

### Lessons Learned
- Custom hooks simplify components and improve maintainability.
- Separating API logic makes debugging easier and enables future enhancements (e.g., `useSignup`, `useFetch`).

---

## Example 3: Handling Empty Job Lists

### Problem Background
On the `JobsPage`, when no jobs existed in the backend, the page appeared blank without any message. This confused users.

### Original Implementation (no handling)
```jsx
// JobsPage.jsx (before)
{jobs.map((job) => (
  <JobListing key={job.id} job={job} />
))}
```

### Fixed Implementation
```jsx
// JobsPage.jsx (after)
{loading ? (
  <Spinner loading={loading} />
) : (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {jobs.length === 0 ? (
      <p>No jobs available at the moment.</p>
    ) : (
      jobs.map((job) => (
        <JobListing key={job.id} job={job} />
      ))
    )}
  </div>
)}
```

### Key Improvements
- Added a conditional check for an empty job list.
- Displayed a clear message instead of leaving the page blank.
- Enhanced user experience by providing feedback.

### Lessons Learned
- Always consider **edge cases** (like empty datasets).
- A small UI improvement can greatly improve usability.

---

## Example 4: Extracting Signup Logic into a Custom Hook

### Problem Background
In **Iteration 2**, the signup logic (fetch request, error handling, navigation) was written directly inside `SignUpPage.jsx`. This made the component long and harder to maintain.

### Original Implementation (logic inside component)
```jsx
// SignUpPage.jsx (before, commented out)
const handleSignUp = async (userData) => {
  try {
    const res = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      throw new Error("Sign up failed");
    }
    return true;
  } catch (error) {
    console.error(error);
    toast.error("An error occurred during sign up.");
    return false;
  }
};
```

### Fixed Implementation (logic moved into custom hook)
```jsx
// useSignup.js
const signup = async (userData) => {
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE_URL}/api/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error("Signup failed");
    }

    const data = await res.json();
    toast.success("Account Created Successfully!");
    navigate("/login");
    return true;
  } catch (error) {
    console.error(error);
    toast.error("An error occurred during sign up.");
    return false;
  } finally {
    setLoading(false);
  }
};

// SignUpPage.jsx (after)
const submitForm = async (e) => {
  e.preventDefault();

  const userData = {
    name,
    email,
    password,
    phone_number: phone,
    gender,
    date_of_birth: dob,
    membership_status: membershipStatus,
  };
  await signup(userData); // from custom hook
};
```

### Key Improvements
- **Separation of Concerns**: API call + navigation moved into `useSignup`.
- **Reusability**: Other components can reuse the same hook.
- **Cleaner Component**: `SignUpPage` now only handles input states + form submission.
- **Better Feedback**: Success/error messages shown via `toast`.

### Lessons Learned
- Creating custom hooks organizes **business logic separately from UI**.
- Improves readability, testing, and maintainability.
- Consistency between `useLogin` and `useSignup` provides a unified auth workflow.

---
