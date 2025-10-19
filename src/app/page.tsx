"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/common/Header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BrainCircuit, Target, Dumbbell } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { motion } from '@/components/ui/motion';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  
  const features = [
    {
      icon: <BrainCircuit className="h-10 w-10 text-primary" />,
      title: 'AI Fitness Suggestions',
      description: 'Get workout recommendations tailored to your goals using our advanced AI.',
    },
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: 'Progress Tracking',
      description: 'Monitor your journey with detailed analytics and progress reports.',
    },
    {
      icon: <Dumbbell className="h-10 w-10 text-primary" />,
      title: 'Personalized Plans',
      description: 'Receive custom workout and diet plans from our professional trainers.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh]">
          {heroImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage.imageHint}
              />
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
            <motion.h1 
              className="font-headline text-4xl font-bold md:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to GymGenius
            </motion.h1>
            <motion.p 
              className="mt-4 max-w-2xl text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The future of fitness is here. AI-powered workouts, expert guidance, and a supportive community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-7 px-8 rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
                <Link href="/login">Join Now</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <motion.section 
          id="features" 
          className="py-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <motion.h2 className="font-headline text-3xl font-bold md:text-4xl" variants={itemVariants}>Why Choose GymGenius?</motion.h2>
              <motion.p className="mt-4 text-muted-foreground md:text-lg" variants={itemVariants}>
                We combine cutting-edge technology with expert knowledge to help you achieve your fitness goals faster.
              </motion.p>
            </div>
            <motion.div 
              className="grid gap-8 md:grid-cols-3"
              variants={containerVariants}
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl bg-card/50 backdrop-blur-sm border-border/20 h-full">
                    <CardHeader className="items-center">
                      {feature.icon}
                      <CardTitle className="mt-4 text-center">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <section id="about" className="bg-muted/50 py-16 md:py-24">
          <div className="container grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-headline text-3xl font-bold md:text-4xl">About Our Gym</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                GymGenius was founded with a simple mission: to make fitness accessible, personalized, and effective for everyone. We believe that with the right tools and guidance, anyone can unlock their full potential. Our state-of-the-art facility and AI-driven platform provide an unparalleled fitness experience.
              </p>
            </motion.div>
            <motion.div 
              className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
               <Image
                src="https://picsum.photos/seed/about/600/400"
                alt="Modern gym interior"
                fill
                className="object-cover"
                data-ai-hint="gym interior"
              />
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer 
        className="border-t"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
      >
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Logo />
            <p className="text-center text-sm leading-loose md:text-left">
              © {new Date().getFullYear()} GymGenius. All Rights Reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
