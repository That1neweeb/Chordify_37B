import React, { useState } from 'react';
import { Music, Award, ShoppingBag, Heart, MapPin, Mail, Phone, Calendar, Camera } from 'lucide-react';

export default function GuitarProfile() {
  const [activeTab, setActiveTab] = useState('collection');
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop");

  const customer = {
    name: "Satyam Shrestha",
    username: "bouna",
    email: "satyam@email.com",
    phone: "9800000000",
    location: "Kathmandu, Nepal",
    memberSince: "January 2026",
    bio: "Collecting vintage guitars and performing live.",
    stats: {
      guitars: 8,
      orders: 24,
      reviews: 18,
      wishlist: 12
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };




  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 mb-8 border border-gray-700 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative group">
              <img 
                src={avatarUrl} 
                alt={customer.name}
                className="w-32 h-32 rounded-full border-4 border-amber-500 shadow-lg object-cover"
              />
              <label 
                htmlFor="avatar-upload" 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="w-8 h-8 text-white" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                {customer.name}
              </h1>
              <p className="text-gray-400 text-lg mb-3">{customer.username}</p>
              <p className="text-gray-300 mb-4 max-w-2xl">{customer.bio}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500" />
                  <span className="text-gray-400">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span className="text-gray-400">{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span className="text-gray-400">{customer.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span className="text-gray-400">Member since {customer.memberSince}</span>
                </div>
              </div>
            </div>
          </div>

          
        </div>

        

        
      </div>
    </div>
  );
}