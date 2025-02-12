"use client"
import { Post } from 'app/components/Post'
import { Navbar } from 'app/components/Navbar'
import { useEffect, useState } from 'react'
import { PostModal } from 'app/components/PostModal'
import { useRouter } from 'next/navigation'


export default function Page() {
    const [posts, setPosts] = useState([])
    const [showModal, setShowModal] = useState(false)
    
    const [currentUser, setCurrentUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            window.location.href = '/login'
            return
        }
        async function fetchCurrentUser() {
            try {
                const response = await fetch('http://localhost:3000/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                const data = await response.json()
                setCurrentUser(data)              
                
            } catch(error) {    
                console.log('Error fetching user:', error)
            }   
        }
        fetchCurrentUser()

        async function fetchPosts() {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('http://localhost:3000/api/posts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                const data = await response.json()
                setPosts(data)
            } catch (error) {
                console.log('Error fetching posts:', error)
            }
        }
        fetchPosts()
        
    }, [router])


    const handlePostModalClick = () => {
        // setCurrentPost(null)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }
    const handleEdit = (post) => {
        // setCurrentPost(post)
        setShowModal(true)

    }
    function handleRemove(id) {
        return async () => {
            const confirmed = window.confirm('Are you sure you want to delete this post?')
            if (!confirmed) {
                return
            }
            try {
                await fetch(`http://localhost:3000/api/posts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                setPosts(posts.filter((post) => post.id !== id))
            } catch (error) {
                console.log('Error deleting post:', error)
            }
        }
    }


   
    function handleLogout() {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    if (!posts) {
        return <div>Loading...</div>
    }


    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar email={currentUser?.email ?? ''} handleLogout={handleLogout}/>
            <div className="container mx-auto flex flex-row justify-between items-center">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold font-sans text-center p p-3">Posts</h1>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handlePostModalClick}>
                        Create Post
                    </button>
                </div>
            </div>

            <div className="container mx-auto flex flex-col justify-center items-center p-3">

                {/*  check if posts is empty else show message  */}
                {posts.length > 0 ? posts.map((post) => (
                    <Post key={post._id} post={post} handleRemove={handleRemove(post.id)} handleEdit={() => handleEdit(post)} />
                )) : (
                    <div className="container mx-auto flex flex-row justify-center items-center p-3">
                        <div className="flex flex-col items-center justify-center bg-white p-2">
                            <h1 className="text-2xl font-bold font-sans text-center p-3">You currently have no posts. Create one now!</h1>
                        </div>
                    </div>
                )}
            </div>
            <PostModal showModal={showModal} handleClose={handleCloseModal}  />
        </div >
    )
}   