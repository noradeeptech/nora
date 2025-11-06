import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface ApplyFormMobileProps {
  onNavigate: (page: string) => void;
  projectId?: string;
}

export function ApplyFormMobile({ onNavigate, projectId }: ApplyFormMobileProps) {
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    semester: '',
    motivation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Application sent successfully!', {
      duration: 3000,
      position: 'top-center',
    });
    setTimeout(() => {
      onNavigate('project-details');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 px-4 py-4 border-b border-gray-100 flex items-center gap-3">
        <button
          onClick={() => onNavigate('project-details')}
          className="p-2 hover:bg-gray-100 rounded-full -ml-2"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg text-gray-900">Apply for Project</h1>
      </div>

      <div className="px-4 py-6 pb-24">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Label htmlFor="name" className="text-gray-900 mb-2 block">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 rounded-xl"
              required
            />
          </motion.div>

          {/* Course Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Label htmlFor="course" className="text-gray-900 mb-2 block">
              Course
            </Label>
            <Input
              id="course"
              type="text"
              placeholder="e.g., Medicine, Engineering"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="h-12 rounded-xl"
              required
            />
          </motion.div>

          {/* Semester Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Label htmlFor="semester" className="text-gray-900 mb-2 block">
              Semester
            </Label>
            <Input
              id="semester"
              type="text"
              placeholder="e.g., 7th semester"
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              className="h-12 rounded-xl"
              required
            />
          </motion.div>

          {/* Motivation Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Label htmlFor="motivation" className="text-gray-900 mb-2 block">
              Motivation
            </Label>
            <Textarea
              id="motivation"
              rows={6}
              placeholder="Tell us why you're interested in this research project and what you hope to achieve..."
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              className="rounded-xl resize-none"
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Button 
              type="submit"
              className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white h-12 rounded-xl"
            >
              Submit Application
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
