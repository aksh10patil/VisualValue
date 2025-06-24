'use client'

import Card from "@/components/Card";

export default function Ideas() {
  
    return (
    <>
          <main className="py-5 px-6 sm:px-8 md:px-6  mb-8">
  <h1 className="text-2xl font-semibold text-center md:text-left">Ideas</h1>
</main>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 px-6 sm:px-8 ml-0  max-w-full">


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
   <Card
    title="Your Untouchable Niche"
    excerpt="Carve out a space so unique, it becomes undeniable."
    imageSrc="/mastery.png"
    link="/ideas/vision"
  />
</div>
    </>
    )
  }
  