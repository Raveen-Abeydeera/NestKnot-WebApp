const request = require('supertest');
const app = require('../server');
const JobRequest = require('../models/JobRequest');

// Mock the JobRequest model
jest.mock('../models/JobRequest');

// Mock the auth middleware to always pass (for POST/DELETE)
jest.mock('../middleware/auth', () => (req, res, next) => {
  req.user = { id: 'mockUserId' };
  next();
});

describe('Job API Endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/jobs', () => {
    it('should return a list of jobs', async () => {
      const mockJobs = [
        { title: 'Job 1', category: 'Plumbing', status: 'Open' },
        { title: 'Job 2', category: 'Electrical', status: 'In Progress' }
      ];

      // Mock the chain: JobRequest.find().sort()
      JobRequest.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockJobs)
      });

      const response = await request(app).get('/api/jobs');
      
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].title).toBe('Job 1');
      expect(JobRequest.find).toHaveBeenCalled();
    });
  });

  describe('POST /api/jobs', () => {
    it('should create a new job successfully', async () => {
      const newJobData = {
        title: 'New Job',
        description: 'New Description',
        category: 'Plumbing',
        location: 'New York',
        contactName: 'John',
        contactEmail: 'john@example.com'
      };

      // When saving, it should return the saved object
      JobRequest.prototype.save = jest.fn().mockResolvedValue({
        ...newJobData,
        _id: 'mockId',
        status: 'Open',
        createdAt: new Date().toISOString()
      });

      const response = await request(app)
        .post('/api/jobs')
        .send(newJobData);
      
      expect(response.status).toBe(201);
      expect(response.body.title).toBe('New Job');
      expect(response.body._id).toBe('mockId');
      expect(JobRequest.prototype.save).toHaveBeenCalled();
    });

    it('should return 400 if validation fails', async () => {
      // Mock save to throw a Mongoose ValidationError
      const mockError = new Error('Validation failed');
      mockError.name = 'ValidationError';
      mockError.message = 'Title is required';
      
      JobRequest.prototype.save = jest.fn().mockRejectedValue(mockError);

      const response = await request(app)
        .post('/api/jobs')
        .send({}); // Missing required fields
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Title is required');
    });
  });
});
