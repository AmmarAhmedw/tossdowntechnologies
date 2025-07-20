import React from "react";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

export const WelcomeOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 rounded-full mb-4">
          <Icon icon="lucide:rocket" className="text-4xl text-pink-600" />
        </div>
        <h1 className="text-3xl font-bold text-pink-700 mb-2">Welcome to Tossdown</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Empowering teams to build, collaborate, and innovate with cutting-edge tools and technology.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
          <CardHeader className="flex items-center space-x-3">
            <Icon icon="lucide:target" className="text-2xl text-pink-600" />
            <h3 className="text-xl font-semibold text-pink-700">Our Mission</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-700 leading-relaxed">
              To democratize access to powerful development tools and create an inclusive environment 
              where every team member can contribute to building amazing products. We believe in 
              empowering developers with the right tools, knowledge, and support to bring their 
              ideas to life.
            </p>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="flex items-center space-x-3">
            <Icon icon="lucide:eye" className="text-2xl text-blue-600" />
            <h3 className="text-xl font-semibold text-blue-700">Our Vision</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-700 leading-relaxed">
              To be the leading platform that transforms how teams collaborate, innovate, and deliver 
              exceptional software. We envision a future where technology barriers are eliminated, 
              and creativity knows no bounds.
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Core Values */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <Icon icon="lucide:heart" className="text-pink-600" />
            <span>Our Core Values</span>
          </h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-pink-50">
              <Icon icon="lucide:users" className="text-3xl text-pink-600 mx-auto mb-3" />
              <h4 className="font-semibold text-pink-700 mb-2">Collaboration</h4>
              <p className="text-sm text-gray-600">
                We believe in the power of teamwork and collective intelligence.
              </p>
            </div>

            <div className="text-center p-4 rounded-lg bg-green-50">
              <Icon icon="lucide:lightbulb" className="text-3xl text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-green-700 mb-2">Innovation</h4>
              <p className="text-sm text-gray-600">
                Constantly pushing boundaries and exploring new possibilities.
              </p>
            </div>

            <div className="text-center p-4 rounded-lg bg-blue-50">
              <Icon icon="lucide:shield-check" className="text-3xl text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-blue-700 mb-2">Quality</h4>
              <p className="text-sm text-gray-600">
                Delivering excellence in everything we build and support.
              </p>
            </div>

            <div className="text-center p-4 rounded-lg bg-purple-50">
              <Icon icon="lucide:zap" className="text-3xl text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-purple-700 mb-2">Agility</h4>
              <p className="text-sm text-gray-600">
                Adapting quickly to change and embracing new challenges.
              </p>
            </div>

            <div className="text-center p-4 rounded-lg bg-orange-50">
              <Icon icon="lucide:book-open" className="text-3xl text-orange-600 mx-auto mb-3" />
              <h4 className="font-semibold text-orange-700 mb-2">Learning</h4>
              <p className="text-sm text-gray-600">
                Fostering continuous growth and knowledge sharing.
              </p>
            </div>

            <div className="text-center p-4 rounded-lg bg-teal-50">
              <Icon icon="lucide:globe" className="text-3xl text-teal-600 mx-auto mb-3" />
              <h4 className="font-semibold text-teal-700 mb-2">Impact</h4>
              <p className="text-sm text-gray-600">
                Making a positive difference in the world through technology.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Company Stats */}
      <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <CardBody>
          <h3 className="text-2xl font-bold mb-6 text-center">Tossdown by the Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">500+</div>
              <div className="text-pink-100">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-pink-100">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">1000+</div>
              <div className="text-pink-100">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">99.9%</div>
              <div className="text-pink-100">Uptime</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Getting Started */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <h3 className="text-xl font-semibold text-green-700 flex items-center space-x-3">
            <Icon icon="lucide:play-circle" className="text-green-600" />
            <span>Getting Started</span>
          </h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <p className="text-gray-700">
              Welcome to the Tossdown family! Here's what you can expect in your onboarding journey:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">Complete Your Profile</h4>
                  <p className="text-sm text-gray-600">Set up your workspace and preferences</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">Explore Your Tools</h4>
                  <p className="text-sm text-gray-600">Get familiar with our internal tools</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">Join Your Team</h4>
                  <p className="text-sm text-gray-600">Connect with colleagues and start collaborating</p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}; 