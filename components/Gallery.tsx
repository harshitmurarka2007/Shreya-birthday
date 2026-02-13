import React from 'react';
import { motion } from 'framer-motion';

// EDITABLE: Update the photo links here.
// 'url' is the link to your image.
// 'caption' is just for your reference since we hid the text.
const photos = [
  { id: '1', url: 'https://drive.google.com/file/d/13YlG0AEYHIAMBE4zb_EebzBU5ndQMQp1/view?usp=drive_link', caption: 'Our first date' },
  { id: '2', url: 'https://drive.google.com/file/d/1vF8tCDZI6lcAIHu8aX5OcZocqW50ikEU/view?usp=drive_link', caption: 'Summer vacation' },
  { id: '3', url: 'https://drive.google.com/file/d/15N60dnkX_vpCLyMBY3KxnYygCmTct0KC/view?usp=drive_link', caption: 'That funny face' },
];

const Gallery: React.FC = () => {
  return (
    <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        {/* EDITABLE: Section Title */}
        <h2 className="text-4xl md:text-5xl font-script text-deep-red mb-4">Beautiful Memories</h2>
        <div className="w-24 h-1 bg-rose-gold mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl shadow-lg bg-white p-2 transform transition-transform hover:-translate-y-2"
          >
            <div className="relative overflow-hidden rounded-lg aspect-w-3 aspect-h-4">
               <img 
                 src={photo.url} 
                 alt={photo.caption}
                 className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
               />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
