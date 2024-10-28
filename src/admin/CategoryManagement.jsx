import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryManagementCount from './CategoryManagementCount';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null); // State to manage editing
  const [editedCategoryName, setEditedCategoryName] = useState(''); // State for edited name

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      
      const response = await axios.get('https://snapmovieserver.onrender.com/api/admin/category', {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in header
        },
      });

      setCategories(response.data); // Set fetched categories to state
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };



  // Add Category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      await axios.post('https://snapmovieserver.onrender.com/api/admin/category/add', 
        { name: newCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in header
          },
        }
      );

      setNewCategory(''); // Clear the input field
      fetchCategories(); // Refresh categories after adding
    } catch (error) {
      console.log('Error adding category:', error);
    }
  };

  // Edit Category
  const handleEditCategory = (category) => {
    setEditingCategory(category._id); // Set the category to be edited
    setEditedCategoryName(category.name); // Set the current name in the input field
  };

  // Save Edited Category
  const handleSaveCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      
      await axios.put(`https://snapmovieserver.onrender.com/api/admin/category/${categoryId}`, 
        { name: editedCategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in header
          },
        }
      );

      setEditingCategory(null); // Exit editing mode
      fetchCategories(); // Refresh categories after updating
    } catch (error) {
      console.log('Error updating category:', error);
    }
  };

  // Cancel Editing
  const handleCancelEdit = () => {
    setEditingCategory(null); // Exit editing mode
  };

  // Delete Category
  const handleDeleteCategory = async (id) => {
    try {
      const token = localStorage.getItem('token');
      
      await axios.delete(`https://snapmovieserver.onrender.com/api/admin/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in header
        },
      });

      fetchCategories(); // Refresh categories after deleting
    } catch (error) {
      console.log('Error deleting category:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

      {/* Form to Add Category */}
      <form onSubmit={handleAddCategory} className="space-y-4">
        <input
          type="text"
          name="category"
          placeholder="New Category"
          value={newCategory}
          className="w-full px-4 py-2 border rounded-md"
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Add Category
        </button>
      </form>

      {/* Display Existing Categories */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Category List</h3>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <li key={category._id} className="bg-white p-4 rounded-md shadow-md">
            {editingCategory === category._id ? (
              <div>
                <input
                  type="text"
                  value={editedCategoryName}
                  className="w-full px-2 py-1 border rounded-md mb-2"
                  onChange={(e) => setEditedCategoryName(e.target.value)}
                />
                <button
                  className="text-sm text-green-500 hover:text-green-700 mr-4"
                  onClick={() => handleSaveCategory(category._id)}
                >
                  Save
                </button>
                <button
                  className="text-sm text-gray-500 hover:text-gray-700"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h4 className="text-lg font-semibold">{category.name}</h4>
                <CategoryManagementCount usedata={category.name} />
                <button
                  className="mt-2 text-sm text-blue-500 hover:text-blue-700 mr-4"
                  onClick={() => handleEditCategory(category)}
                >
                  Edit
                </button>
                <button
                  className="mt-2 text-sm text-red-500 hover:text-red-700 mr-4"
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  Delete
                </button>
                <button
                  className="mt-2 text-sm text-green-500 hover:text-green-700"
                 >
                   View
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
