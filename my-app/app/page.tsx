import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Music, Users, Headphones, ChevronRight, Menu } from "lucide-react"
import { Appbar } from "./components/Appbar"
import { Redirect } from "./components/Redirect"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/30 border-b border-white/10">
   <Appbar />
    
   <Redirect />
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-600 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-pink-600 rounded-full filter blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Let Your Fans Choose The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Music</span>{" "}
              For Your Stream
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              The first platform that connects creators with their audience through music. Give your fans the power to
              influence your stream's soundtrack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
              >
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-purple-500 text-white hover:bg-purple-950/50">
                Watch Demo <Play className="ml-2 size-4" />
              </Button>
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl mt-16">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-xl opacity-30"></div>
            <div className="relative backdrop-blur-sm bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                width={1200}
                height={600}
                alt="FanPlay Dashboard Preview"
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <Music className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Music Stream Hub</h3>
                    <p className="text-sm text-gray-300">2,500+ active listeners shaping the playlist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Features That Empower{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Creators
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to engage your audience through the power of music
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Music className="size-6" />,
                title: "Fan-Curated Playlists",
                description: "Let your audience vote on songs and create collaborative playlists for your streams.",
              },
              {
                icon: <Users className="size-6" />,
                title: "Community Engagement",
                description: "Boost interaction with real-time music requests and voting systems.",
              },
              {
                icon: <Headphones className="size-6" />,
                title: "Seamless Integration",
                description: "Works with all major streaming platforms and music services.",
              },
            ].map((feature, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative h-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all">
                  <div className="size-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-black/30 backdrop-blur-md border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              How{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                FanPlay
              </span>{" "}
              Works
            </h2>
            <p className="text-xl text-gray-300">Three simple steps to revolutionize your streaming experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Connect Your Account",
                description: "Link your streaming and music accounts in just a few clicks.",
              },
              {
                step: "02",
                title: "Share With Your Fans",
                description: "Give your audience access to your music queue with a custom link.",
              },
              {
                step: "03",
                title: "Let Fans Choose",
                description: "Watch as your community votes and shapes your stream's soundtrack.",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute -top-4 -left-4 size-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6 pt-10">
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-full">
                    <ChevronRight className="size-8 text-purple-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl blur-2xl"></div>
            <div className="relative backdrop-blur-md bg-black/40 border border-white/10 rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join Our Growing{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Community
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Connect with thousands of creators who are building deeper relationships with their audience through the
                power of music.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                >
                  Join Community
                </Button>
                <Button size="lg" variant="outline" className="border-purple-500 text-white hover:bg-purple-950/50">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black/50 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
            <Link href="/" className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="relative size-8">
                <div className="absolute inset-0 rounded-full bg-purple-500 blur-sm opacity-70"></div>
                <div className="relative flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                  <Music className="size-4 text-white" />
                </div>
              </div>
              <span className="font-bold text-xl">FanPlay</span>
            </Link>

            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} FanPlay. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
