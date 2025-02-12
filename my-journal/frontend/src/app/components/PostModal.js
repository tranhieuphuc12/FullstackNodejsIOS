import React, { useState, useEffect } from 'react'
import 'tailwindcss/tailwind.css'


export const PostModal = ({ showModal, handleClose }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [currentPost, setCurrentPost] = useState(null)

    useEffect(() => {
        if (currentPost) {
            setTitle(currentPost.title)
            setContent(currentPost.content)
            setImageUrl(currentPost.imageUrl)
        } else {
            setTitle('')
            setContent('')
            setImageUrl('')
        }
    }, [currentPost])

    const onSave = () => {
        console.log('onSave', { title, content, imageUrl })
        handleSave({ title, content, imageUrl })
    }
    const handleSave = async (post) => {
        try {
          const token = localStorage.getItem('token')
          const url = currentPost
            ? `http://localhost:3000/api/posts/${currentPost._id}`
            : 'http://localhost:3000/api/posts'
          const method = currentPost ? 'PATCH' : 'POST'
    
          const response = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(post),
          })
    
          if (!response.ok) {
            throw new Error('Failed to save post')
          }
    
          const savedPost = await response.json()
          console.log('Post saved:', savedPost)
          handleClose()
        } catch (error) {
          console.error('Error saving post:', error)
        }
      }


    return (
        <>
            {
                showModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203</span>
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Create a new post</h3>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                className="w-full border border-gray-300 rounded-md p-2 mt-2"
                                                placeholder="Title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                            <textarea
                                                className="w-full border border-gray-300 rounded-md p-2 mt-2"
                                                placeholder="Content"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="w-full border border-gray-300 rounded-md p-2 mt-2"
                                                placeholder="Image URL"
                                                value={imageUrl}
                                                onChange={(e) => setImageUrl(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={onSave}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )



}

