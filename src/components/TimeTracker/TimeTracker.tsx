
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Square, Coffee } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const TimeTracker: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedProject, setSelectedProject] = useState('');
  const [breakTime, setBreakTime] = useState(0);

  const projects = [
    { id: '1', name: 'E-commerce Website' },
    { id: '2', name: 'Mobile App Development' },
    { id: '3', name: 'Data Analytics Dashboard' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!selectedProject) {
      toast({
        title: "Error",
        description: "Please select a project before starting the timer.",
        variant: "destructive",
      });
      return;
    }
    setIsRunning(true);
    setIsPaused(false);
    toast({
      title: "Timer Started",
      description: "Time tracking has begun for the selected project.",
    });
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Timer Resumed" : "Break Started",
      description: isPaused ? "Time tracking resumed." : "Break time is being tracked separately.",
    });
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    toast({
      title: "Timer Stopped",
      description: `Total time logged: ${formatTime(seconds)}`,
    });
    // Reset for demo
    setSeconds(0);
    setBreakTime(0);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Time Tracker
            <Badge variant={isRunning ? (isPaused ? "secondary" : "default") : "outline"}>
              {isRunning ? (isPaused ? "On Break" : "Active") : "Stopped"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-mono font-bold text-blue-600 mb-4">
              {formatTime(seconds)}
            </div>
            {breakTime > 0 && (
              <div className="text-sm text-gray-600">
                Break time: {formatTime(breakTime)}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Project</label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a project..." />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center space-x-4">
              {!isRunning ? (
                <Button onClick={handleStart} className="flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Start</span>
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={handlePause} 
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    {isPaused ? <Play className="h-4 w-4" /> : <Coffee className="h-4 w-4" />}
                    <span>{isPaused ? "Resume" : "Break"}</span>
                  </Button>
                  <Button 
                    onClick={handleStop} 
                    variant="destructive"
                    className="flex items-center space-x-2"
                  >
                    <Square className="h-4 w-4" />
                    <span>Stop</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">7:30</div>
              <div className="text-sm text-gray-600">Total Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">0:45</div>
              <div className="text-sm text-gray-600">Break Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">6:45</div>
              <div className="text-sm text-gray-600">Productive Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
