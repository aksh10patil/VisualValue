'use client'

import Card from "@/components/Card";

export default function ideas() {
    return <>
          <main className="ml-64 p-6">
            <h1 className="text-xl font-semibold">Ideas</h1>
           </main>

          <div className="md:ml-70 md:mr-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card
        title="Understanding Leverage as a Driving Force"
        excerpt="Leverage is as much about where you are standing as how much force you are applying."
        imageSrc="/lev.png"
        link="/ideas/leverage"
      />
      <Card
        title="Labour v/s Vision"
        excerpt="Labor is the execution, while vision is the direction."
        imageSrc="/vision.png"
        link="/ideas/vision"
      />
      </div>
    </>
  }
  