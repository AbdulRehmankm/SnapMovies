import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemManagement = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    fullprice: '',
    rating: '',
    releaseDate: '',
    type: '',
    language: '',
    availableFormats: '',
    category: '',
    description: '',
  });
  const [images, setImages] = useState([null, null, null]); // Array to hold three images
  const [editingItemId, setEditingItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loader state

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://snapmovieserver.onrender.com/api/items');
      const sortedItems = response.data.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setItems(sortedItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const updatedImages = [...images];
    updatedImages[index] = file; // Set the selected file at the corresponding index
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const formData = new FormData();
    // Append new item details to formData
    Object.entries(newItem).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Check if new images are uploaded, otherwise keep the existing images
    images.forEach((image, index) => {
      if (image && typeof image !== 'string') {
        formData.append(`images`, image); // If new image is uploaded, append it
      } else if (typeof image === 'string') {
        formData.append(`existingImages`, image); // Keep existing image URL
      }
    });

    try {
      if (editingItemId) {
        await axios.put(`https://snapmovieserver.onrender.com/api/items/${editingItemId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('https://snapmovieserver.onrender.com/api/items/add', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // Refresh items and reset form
      fetchItems();
      resetForm();
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleEdit = (item) => {
    setNewItem({
      name: item.name,
      price: item.price,
      fullprice: item.fullprice,
      rating: item.rating,
      releaseDate: item.releaseDate ? new Date(item.releaseDate).toISOString().split('T')[0] : '',
      type: item.type,
      language: item.language.join(','), // Assuming language is an array
      availableFormats: item.availableFormats.join(', '), // Assuming availableFormats is an array
      category: item.category.name, // Use category ID if required for form
      description: item.description,
    });

    // Populate with existing images
    setImages([item.image1, item.image2, item.image3]);
    setEditingItemId(item._id); // Set the ID of the item being edited
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://snapmovieserver.onrender.com/api/items/${id}`);
      fetchItems(); // Refresh the item list
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const resetForm = () => {
    setNewItem({
      name: '',
      price: '',
      fullprice: '',
      rating: '',
      releaseDate: '',
      type: '',
      language: '',
      availableFormats: '',
      category: '',
      description: '',
    });
    setImages([null, null, null]); // Reset image inputs
    setEditingItemId(null);
  };

  const handleisfree = async (freeItemId) => {
     
    try {
    await axios.put(`https://snapmovieserver.onrender.com/api/items//setfree/${freeItemId}`);
    
     window.location.reload();
    
    } catch (error) {
      console.error("Error in set free item:", error);
    }
  };
  




  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{editingItemId ? 'Edit Item' : 'Manage Items'}</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {Object.entries(newItem).map(([key, value]) => (
          <input
            key={key}
            type={key === 'releaseDate' ? 'date' : 'text'}
            name={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
            value={value}
            required={key !== 'fullprice' && key !== 'rating'} // Making some fields optional
          />
        ))}

        {/* File inputs for three images */}
        {images.map((image, index) => (
          <input
            key={index}
            type="file"
            onChange={(e) => handleImageChange(e, index)}
            className="w-full px-4 py-2 border rounded-md"
            accept="image/*"
            required={!editingItemId && index === 0} // Only require the first image when adding a new item
          />
        ))}

        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          {isLoading ? 'Loading...' : editingItemId ? 'Update Item' : 'Add Item'}
        </button>
      </form>

      {isLoading && (
        <div className="flex justify-center mt-4">
          <div className="loader">Loading...</div> {/* You can replace this with a spinner component */}
        </div>
      )}

      <h3 className="text-xl font-semibold mt-10 mb-4">Items List</h3>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {items.map((item) => (
          <li key={item._id} className="bg-white p-4 rounded-md shadow-md">
            <div className=' flex'>
              <img src={item.image1} alt={item.name} className="object-cover h-20" />
            <h2 className=" text-sm font-bold text-gray-800 ml-2">{item.name}</h2>
            </div>
            

            <h2 className="text-xl font-bold text-gray-800 mb-2 cursor-pointer">{item.category.name} / Rs.{item.price}</h2>
  
            <button
              className="mt-2 text-sm text-blue-500 hover:text-blue-700 mr-10"
              onClick={() => handleEdit(item)}
            >
              Edit
            </button>
            <button
              className="mt-2 text-sm text-red-500 hover:text-red-700 mr-10"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
            <button
              className="mt-2 text-sm text-green-500 hover:text-green-700"
            >
              View
            </button>

      <button
       onClick={() => handleisfree(item._id)} 
        className={` mt-2 relative w-20 h-10 flex items-center ${item.isFreeToday? 'bg-blue-500' : 'bg-green-500'} rounded-full p-1 cursor-pointer transition-all duration-300`}
      >
        <div
          className={`w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            item.isFreeToday ? '' : 'translate-x-10'
          }`}
        ></div>
        <span className={`absolute text-black text-sm left-2 ${item.isFreeToday ? 'opacity-100' : 'opacity-0'}`}>
          Free
        </span>
        <span className={`absolute text-black text-sm right-2 ${!item.isFreeToday ? 'opacity-100' : 'opacity-0'}`}>
          Paid
        </span>
      </button>



             
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemManagement;
