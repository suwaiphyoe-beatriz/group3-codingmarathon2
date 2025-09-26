#### getAllJobs

Before: Returned all jobs, no limit.

```javascript
const jobs = await Job.find({}).sort({ createdAt: -1 });
```

After: Supports optional _limit query.

```javascript
const limit = parseInt(req.query._limit);
const jobs = limit
  ? await Job.find({}).sort({ createdAt: -1).limit(limit)
  : await Job.find({}).sort({ createdAt: -1 });
```
Improvement: Handles large datasets safely.

#### UpdateJob & DeleteJob – Authentication Check

Before: Any authenticated user could modify/delete jobs.

```javascript
const job = await Job.findByIdAndUpdate(id, { ...req.body });
```

After: Restricts to job owner.

```javascript
const job = await Job.findOneAndUpdate(
  { _id: id, user_id: req.user._id },
  { ...req.body },
  { new: true, runValidators: true }
);
```

Improvement: Enhances security and authorization.

#### signupUser – Password Hashing & Duplicate Check

Before: version without hashing/duplicate check

```javascript
const user = await User.create(req.body);
```

After: Added email uniqueness check and bcrypt hashing:

```javascript
const existingUser = await User.findOne({ email });
if (existingUser) return res.status(400).json({ error: 'User exists' });

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const user = await User.create({ ...req.body, password: hashedPassword });
```

Improvement: Prevents duplicate accounts, secures passwords.

#### GenerateToken – JWT Creation

Before: Token generation not implemented.

After: Generates JWT for authentication:

```javascript
const generateToken = (_id) => jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
```

Improvement: Provides secure, time-limited authentication for API access.

#### Public vs Protected Routes

Before: All routes were accessible without authentication.

```javascript
router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);
```

After: Added requireAuth middleware to protect write operations:

```javascript
router.post("/", requireAuth, createJob);
router.put("/:id", requireAuth, updateJob);
router.delete("/:id", requireAuth, deleteJob);
```

Improvement: Ensures only authenticated users can create, update, or delete jobs.

#### user_id – Linking Jobs to Users

Before: Jobs had no reference to the user who created them.

```javascript
title: { type: String, required: true }
```

After: Added user_id as a required ObjectId referencing the User model:

```javascript
user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
```

Improvement:

Ownership Tracking: Each job is linked to a specific user.
Authorization Support: Enables route-level checks so only the job owner can update/delete it.
Data Integrity: Prevents jobs from existing without an associated user

#### Middleware Setup

Before: Minimal middleware, no logging, CORS, or JSON parsing.
```javascript
app.use(express.json());
```

After: Added cors, morgan logging, and JSON parsing:

```javascript
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
```

Improvement: Enables cross-origin requests, logs requests for debugging, and handles JSON payloads.