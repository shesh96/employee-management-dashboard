import { useState, useEffect } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import { useNavigate, useParams } from 'react-router-dom';
import { convertToBase64 } from '../utils/fileUtils';
import { Save, X, Upload, Trash2 } from 'lucide-react';

const EmployeeForm = () => {
    const { addEmployee, updateEmployee, employees } = useEmployees();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        gender: 'Male',
        dob: '',
        state: '',
        active: true,
        image: ''
    });

    const [imagePreview, setImagePreview] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditMode) {
            const employee = employees.find(e => e.id === id);
            if (employee) {
                setFormData(employee);
                setImagePreview(employee.image);
            } else {
                navigate('/employees');
            }
        }
    }, [id, employees, navigate, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, image: 'Image size must be less than 2MB' }));
                return;
            }

            try {
                const base64 = await convertToBase64(file);
                setFormData(prev => ({ ...prev, image: base64 }));
                setImagePreview(base64);
                setErrors(prev => ({ ...prev, image: '' }));
            } catch (err) {
                console.error("Error converting image", err);
                setErrors(prev => ({ ...prev, image: 'Failed to process image' }));
            }
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, image: '' }));
        setImagePreview('');
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.dob) newErrors.dob = 'Date of Birth is required';
        if (!formData.state) newErrors.state = 'State is required';

        // Basic email format validation if provided
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (isEditMode) {
            updateEmployee(id, formData);
        } else {
            addEmployee(formData);
        }
        navigate('/employees');
    };

    return (
        <div className="employee-form-page">
            <div className="form-header header mb-6">
                <h1>{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h1>
                <p>Fill in the details below.</p>
            </div>

            <div className="card form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        {/* Left Column: Image Upload */}
                        <div className="image-section">
                            <div className={`image-preview-container ${errors.image ? 'border-danger' : ''}`}>
                                {imagePreview ? (
                                    <div className="image-wrapper">
                                        <img src={imagePreview} alt="Preview" className="image-preview" />
                                        <button type="button" onClick={removeImage} className="remove-image-btn" title="Remove Image">
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="placeholder-image">
                                        <Upload size={32} color="var(--text-light)" />
                                        <span>Upload Photo</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="file-input"
                                />
                            </div>
                            {errors.image && <p className="error-text text-center mt-2">{errors.image}</p>}
                            <p className="help-text">JPG, PNG allowed (Max 2MB).</p>
                        </div>

                        {/* Right Column: Fields */}
                        <div className="fields-section">
                            <div className="input-group">
                                <label className="label">Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className={`input ${errors.fullName ? 'input-error' : ''}`}
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                                {errors.fullName && <p className="error-text">{errors.fullName}</p>}
                            </div>

                            <div className="row-2">
                                <div className="input-group">
                                    <label className="label">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`input ${errors.email ? 'input-error' : ''}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <p className="error-text">{errors.email}</p>}
                                </div>
                                <div className="input-group">
                                    <label className="label">Date of Birth *</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        className={`input ${errors.dob ? 'input-error' : ''}`}
                                        value={formData.dob}
                                        onChange={handleChange}
                                    />
                                    {errors.dob && <p className="error-text">{errors.dob}</p>}
                                </div>
                            </div>

                            <div className="row-2">
                                <div className="input-group">
                                    <label className="label">Gender</label>
                                    <select
                                        name="gender"
                                        className="select"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label className="label">State *</label>
                                    <select
                                        name="state"
                                        className={`select ${errors.state ? 'input-error' : ''}`}
                                        value={formData.state}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select State</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="West Bengal">West Bengal</option>
                                    </select>
                                    {errors.state && <p className="error-text">{errors.state}</p>}
                                </div>
                            </div>

                            <div className="input-group toggle-group">
                                <label className="label">Status</label>
                                <div className="toggle-switch">
                                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            name="active"
                                            checked={formData.active}
                                            onChange={handleChange}
                                            style={{ marginRight: '0.5rem' }}
                                        />
                                        <span className="toggle-label">
                                            {formData.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="form-actions mt-6">
                                <button type="button" onClick={() => navigate('/employees')} className="btn btn-outline">
                                    <X size={18} /> Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <Save size={18} /> Save Employee
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <style>{`
        .form-card {
          max-width: 800px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 2.5rem;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        .image-section {
          text-align: center;
        }

        .image-preview-container {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 2px dashed var(--border-color);
          overflow: hidden;
          position: relative;
          background: var(--surface-hover);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.5rem;
        }
        
        .image-preview-container:hover .file-input {
             cursor: pointer;
        }

        .image-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
        }

        .image-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .remove-image-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(0,0,0,0.5);
            color: white;
            border: none;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
        }
        
        .remove-image-btn:hover {
            background: rgba(239, 68, 68, 0.9);
        }

        .placeholder-image {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-light);
          font-size: 0.75rem;
        }

        .file-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .help-text {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
        }

        .error-text {
            color: var(--danger-color);
            font-size: 0.75rem;
            margin-top: 0.25rem;
        }
        
        .input-error {
            border-color: var(--danger-color);
        }
        
        .border-danger {
            border-color: var(--danger-color);
        }
        
        .text-center { text-align: center; }

        .mb-6 { margin-bottom: 1.5rem; }
        .mt-6 { margin-top: 1.5rem; }
        .mt-2 { margin-top: 0.5rem; }

        .toggle-switch input {
          margin-right: 0.5rem;
        }
      `}</style>
        </div>
    );
};

export default EmployeeForm;
