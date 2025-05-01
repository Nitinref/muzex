"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronUp, ChevronDown, Music, Play, ThumbsUp, Share2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

export default function Home() {
    const session = useSession()
    const [videoUrl, setVideoUrl] = useState("")
    const [previewId, setPreviewId] = useState("")
    const [queue, setQueue] = useState([
        { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", votes: 15 },
        { id: "9bZkp7q19f0", title: "PSY - GANGNAM STYLE", votes: 12 },
        { id: "JGwWNGJdvx8", title: "Ed Sheeran - Shape of You", votes: 8 },
        { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito ft. Daddy Yankee", votes: 5 },
    ])
    const [currentVideo, setCurrentVideo] = useState("dQw4w9WgXcQ")

    // Extract YouTube video ID from URL
    const extractVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        return match && match[2].length === 11 ? match[2] : null
    }

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVideoUrl(e.target.value)
        const videoId = extractVideoId(e.target.value)
        if (videoId) {
            setPreviewId(videoId)
        } else {
            setPreviewId("")
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const videoId = extractVideoId(videoUrl)
        if (videoId) {
            setQueue([...queue, { id: videoId, title: `New Video (${videoId})`, votes: 1 }])
            setVideoUrl("")
            setPreviewId("")
        }
    }

    const handleVote = (id: string, increment: number) => {
        if (!session.data?.user) {
            toast.error("Please sign in to vote")
            return
        }

        const newQueue = queue
            .map((item) => {
                if (item.id === id) {
                    const newVotes = Math.max(0, item.votes + increment)
                    toast.success(`Vote ${increment > 0 ? 'added' : 'removed'}!`)
                    return { ...item, votes: newVotes }
                }
                return item
            })
            .sort((a, b) => b.votes - a.votes)

        setQueue(newQueue)
    }

    const playNext = () => {
        if (queue.length > 0) {
            setCurrentVideo(queue[0].id)
            setQueue(queue.slice(1))
        }
    }

    const handleShare = async () => {
        try {
            const shareData = {
                title: 'Check out my MUZEX playlist',
                text: 'Join me on MUZEX to listen to great music together!',
                url: window.location.href,
            }
            
            if (navigator.share) {
                await navigator.share(shareData)
            } else {
                await navigator.clipboard.writeText(window.location.href)
                toast.success('Link copied to clipboard!')
            }
        } catch (err) {
            console.error('Error sharing:', err)
            // @ts-ignore
            if (err.name !== 'AbortError') {
                toast.error('Failed to share. Please try again.')
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-purple-950/30 text-white">
            {/* Header */}
            <header className="border-b border-purple-900/30 backdrop-blur-sm bg-black/50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-purple-600 rounded-full p-2">
                            <Music className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold">MUZEX</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#" className="hover:text-purple-400 transition">
                            Features
                        </a>
                        <a href="#" className="hover:text-purple-400 transition">
                            How It Works
                        </a>
                        <a href="#" className="hover:text-purple-400 transition">
                            Community
                        </a>
                    </nav>
                    <div className="flex items-center gap-4">
                        {session.data?.user && (
                            <>
                                <Button 
                                    onClick={handleShare}
                                    variant="outline" 
                                    className="flex items-center gap-2 bg-transparent hover:bg-purple-900/30 border-purple-700"
                                >
                                    <Share2 className="h-4 w-4" />
                                    Share
                                </Button>
                                <Button className="m-2 p-2 bg-black-900" onClick={() => signOut()}>
                                    Logout
                                </Button>
                            </>
                        )}
                        {!session.data?.user && (
                            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => signIn()}>
                                Sign in
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Current Playing Video */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Now Playing</h2>
                            <Button onClick={playNext} className="bg-purple-600 hover:bg-purple-700">
                                <Play className="mr-2 h-4 w-4" /> Play Next
                            </Button>
                        </div>
                        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg shadow-purple-900/20">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Submit and Queue */}
                    <div className="space-y-8">
                        {/* Submit Form */}
                        <Card className="bg-gradient-to-br from-gray-900 to-purple-950/50 border-purple-900/30 p-6 rounded-lg shadow-lg shadow-purple-900/10">
                            <h2 className="text-2xl font-bold mb-4">Submit a Song</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Paste YouTube URL here"
                                        value={videoUrl}
                                        onChange={handleUrlChange}
                                        className="bg-gray-800 border-purple-900/30 focus:border-purple-500"
                                    />
                                </div>

                                {previewId && (
                                    <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${previewId}`}
                                            title="YouTube video preview"
                                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        ></iframe>
                                    </div>
                                )}

                                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={!previewId}>
                                    Add to Queue
                                </Button>
                            </form>
                        </Card>

                        {/* Queue */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Up Next</h2>
                            <div className="space-y-3">
                                {queue.map((video) => (
                                    <Card
                                        key={video.id}
                                        className="bg-gradient-to-r from-gray-900 to-purple-950/30 border-purple-900/30 p-4 rounded-lg hover:shadow-md hover:shadow-purple-900/20 transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-24 h-16 bg-gray-800 rounded overflow-hidden">
                                                <img
                                                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{video.title}</p>
                                                <Badge variant="secondary" className="mt-1 bg-purple-900/50 text-purple-200">
                                                    <ThumbsUp className="h-3 w-3 mr-1" /> {video.votes} votes
                                                </Badge>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <Button
                                                    onClick={() => handleVote(video.id, 1)}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 p-1 h-auto"
                                                    aria-label="Upvote"
                                                >
                                                    <ChevronUp className="h-5 w-5" />
                                                </Button>
                                                <Button
                                                    onClick={() => handleVote(video.id, -1)}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 p-1 h-auto"
                                                    aria-label="Downvote"
                                                >
                                                    <ChevronDown className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}

                                {queue.length === 0 && (
                                    <div className="bg-gradient-to-r from-gray-900 to-purple-950/30 border border-purple-900/30 rounded-lg p-8 text-center">
                                        <p className="text-gray-400">No songs in queue</p>
                                        <p className="text-sm text-gray-500 mt-2">Submit a YouTube link to get started</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}