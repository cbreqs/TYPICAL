
"use client"

import * as React from "react"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Camera, Upload, Pencil, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
  hint?: string;
}

const initialImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://placehold.co/600x400.png",
    alt: "Our modern and innovative workspace",
    caption: "Our modern and innovative workspace, designed for collaboration.",
    hint: "office workspace",
  },
  {
    id: 2,
    src: "https://placehold.co/600x400.png",
    alt: "A creative brainstorming session in action",
    caption: "A creative brainstorming session in action.",
    hint: "team collaboration",
  },
  {
    id: 3,
    src: "https://placehold.co/600x400.png",
    alt: "Successful client partnership meeting",
    caption: "Successful client partnership meeting.",
    hint: "modern architecture",
  },
   {
    id: 4,
    src: "https://placehold.co/600x400.png",
    alt: "Team celebrating a project milestone",
    caption: "Team celebrating a project milestone.",
    hint: "team celebration"
  },
];


export default function Home() {
  const [images, setImages] = React.useState<GalleryImage[]>(initialImages);
  const [selectedImage, setSelectedImage] = React.useState<GalleryImage | null>(null);
  const [editingImage, setEditingImage] = React.useState<GalleryImage | null>(null);
  const [captionInput, setCaptionInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleEditClick = (image: GalleryImage) => {
    setEditingImage(image);
    setCaptionInput(image.caption);
  };

  const handleDeleteClick = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
  };
  
  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaptionInput(e.target.value);
  };

  const handleCaptionSave = () => {
    if (editingImage) {
      setImages(
        images.map((image) =>
          image.id === editingImage.id ? { ...image, caption: captionInput } : image
        )
      );
      setEditingImage(null);
      setCaptionInput("");
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage: GalleryImage = {
          id: Date.now(),
          src: event.target?.result as string,
          alt: "A new user-uploaded image",
          caption: "A new image",
        };
        setImages([...images, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };


  return (
    <div className="bg-background min-h-screen">
      <header className="py-12 px-4 md:px-8 text-center">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-foreground">
          Typical Solutions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A landing page for the soul.
        </p>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="shadow-lg rounded-xl overflow-hidden">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Our Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-w-16 aspect-h-9">
                 <iframe src="https://calendar.google.com/calendar/embed?src=c_2f568a2e0f60232844e93bce90b2754b9ab57ba53f2727f999d1513ecbd6baa6%40group.calendar.google.com&ctz=America%2FChicago" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
                <p className="mt-2 text-xs text-muted-foreground">
                  Schedule an appointment with us!
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Follow Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-6">
                    <a href="https://www.facebook.com/reqsdottech" className="text-primary hover:text-primary/80">
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a href="https://www.instagram.com/mostlycourtney" className="text-primary hover:text-primary/80">
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/not-a-meatball/" className="text-primary hover:text-primary/80">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground">
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>117 Lexington St., Ste 100, Harrisonville, MO 64701</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>(816) 399-2288</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>hello@typical.solutions</span>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Monthly Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">
                  Welcome to our refreshed landing page for the month! We're
                  excited to share new updates, features, and stories with you.
                  Check back regularly for the latest news and happenings. This
                  month, we're spotlighting our new partnership and upcoming
                  community events.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl">
              <CardHeader className="flex-row items-center gap-4">
                  <Camera className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle className="font-headline text-2xl">Photo Gallery</CardTitle>
                    <CardDescription>A glimpse into our world. Click an image to enlarge.</CardDescription>
                  </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div ref={scrollRef} className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide">
                    {images.map((image) => (
                      <div key={image.id} className="flex-shrink-0 w-64">
                        <div
                          className="w-full h-40 bg-muted rounded-lg overflow-hidden cursor-pointer"
                          onClick={() => handleImageClick(image)}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover"
                            {...(image.hint && { 'data-ai-hint': image.hint })}
                          />
                        </div>
                        <div className="mt-2 text-sm text-foreground">
                          {editingImage?.id === image.id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                type="text"
                                value={captionInput}
                                onChange={handleCaptionChange}
                                onBlur={handleCaptionSave}
                                onKeyDown={(e) => e.key === 'Enter' && handleCaptionSave()}
                                className="h-8"
                                autoFocus
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <p className="truncate pr-2">{image.caption}</p>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <button onClick={() => handleEditClick(image)} className="text-muted-foreground hover:text-foreground">
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDeleteClick(image.id)} className="text-muted-foreground hover:text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                   {images.length > 3 && (
                    <>
                      <Button variant="outline" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full h-8 w-8" onClick={() => scroll('left')}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full h-8 w-8" onClick={() => scroll('right')}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                 <Button onClick={handleUploadClick}>
                  <Upload className="mr-2 h-4 w-4" /> Upload Image
                </Button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              </CardFooter>
            </Card>

            <Card className="shadow-lg rounded-xl bg-primary/20 border-primary/50">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-foreground">
                  Our Charitable Focus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  This month, we are proud to support 'Innovate for Good', a
                  non-profit dedicated to providing technology education to
                  underprivileged youth. A portion of all our proceeds will go
                  towards funding their coding bootcamps and workshops. Join us
                  in making a difference!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="text-center py-8 px-4 mt-8">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Typical LLC. All Rights Reserved.
        </p>
      </footer>

      {selectedImage && (
        <Dialog open onOpenChange={closeModal}>
          <DialogContent className="max-w-4xl p-0">
            <DialogHeader className="p-4">
              <DialogTitle>{selectedImage.caption}</DialogTitle>
            </DialogHeader>
            <div className="w-full aspect-video overflow-hidden">
               <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="w-full h-full object-contain"
                />
            </div>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}

    </div>
  )
}
