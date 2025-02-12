
import React from 'react';

export const Post = ({ post, handleRemove,handleEdit }) => {


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-10">
      <img className="w-full" src={post.imageUrl} alt={post.title} layout="responsive" width={400} height={300} />
      <div className="border-b border-gray-200 "></div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="text-gray-700 text-base">
          {post.content}  
        </p>
      </div>
      {/* adding edit and delete button */}
      <div className="flex justify-end px-6 py-4">
        <button onClick={handleEdit} className="bg-black text-white font-bold py-2 px-4 rounded mr-2">
          Open
        </button>
        <button onClick={handleRemove} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};