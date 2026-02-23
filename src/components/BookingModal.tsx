'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn, EASE_OUT_EXPO } from '@/lib/utils'

const ALBERTA_CITIES = [
  'Calgary', 'Banff', 'Canmore', 'Jasper', 'Lake Louise',
  'Drumheller', 'Edmonton', 'Lethbridge', 'Red Deer',
  'Calgary YYC Airport', 'Edmonton YEG Airport',
]

const quickBookSchema = z.object({
  fullName: z.string().min(2, 'Full name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Valid phone required'),
  pickupLocation: z.string().min(2, 'Pickup location required'),
  dropoffLocation: z.string().min(2, 'Drop-off location required'),
  travelDate: z.string().min(1, 'Travel date required'),
  passengers: z.number().min(1).max(20),
  notes: z.string().max(300).optional(),
})

type QuickBookData = z.infer<typeof quickBookSchema>

interface BookingModalProps {
  open: boolean
  onClose: () => void
  prefilledRoute?: { from: string; to: string }
}

export function BookingModal({ open, onClose, prefilledRoute }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuickBookData>({
    resolver: zodResolver(quickBookSchema),
    defaultValues: {
      passengers: 2,
      pickupLocation: prefilledRoute?.from ?? '',
      dropoffLocation: prefilledRoute?.to ?? '',
    },
  })

  const onSubmit = async (data: QuickBookData) => {
    setIsSubmitting(true)
    // Simulate API call — replace with actual booking API
    await new Promise((resolve) => setTimeout(resolve, 1400))
    console.log('Booking request:', data)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setIsSuccess(false)
      reset()
    }, 300)
  }

  const inputClass =
    'bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-glacial h-10'

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Quick Booking Request</DialogTitle>
          <DialogDescription>
            We&apos;ll confirm your journey within 2 hours.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-glacial/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-glacial w-9 h-9" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Booking Request Received!</h3>
              <p className="text-white/60 text-sm mb-6">
                Our team will confirm your journey within 2 hours. Check your email for details.
              </p>
              <Button
                onClick={handleClose}
                className="bg-gold text-pine-dark hover:bg-gold-dark font-semibold px-8"
              >
                Done
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 mt-2"
            >
              {/* Contact info */}
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label className="text-white/80 mb-1 block text-xs">Full Name</Label>
                  <Input
                    {...register('fullName')}
                    placeholder="John Smith"
                    className={inputClass}
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-white/80 mb-1 block text-xs">Email</Label>
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder="you@email.com"
                      className={inputClass}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/80 mb-1 block text-xs">Phone</Label>
                    <Input
                      {...register('phone')}
                      type="tel"
                      placeholder="+1 403..."
                      className={inputClass}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Route */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/80 mb-1 block text-xs">Pickup Location</Label>
                  <Input
                    {...register('pickupLocation')}
                    placeholder="e.g. Calgary"
                    list="cities-from"
                    className={inputClass}
                  />
                  <datalist id="cities-from">
                    {ALBERTA_CITIES.map((c) => <option key={c} value={c} />)}
                  </datalist>
                  {errors.pickupLocation && (
                    <p className="text-red-400 text-xs mt-1">{errors.pickupLocation.message}</p>
                  )}
                </div>
                <div>
                  <Label className="text-white/80 mb-1 block text-xs">Drop-off Location</Label>
                  <Input
                    {...register('dropoffLocation')}
                    placeholder="e.g. Banff"
                    list="cities-to"
                    className={inputClass}
                  />
                  <datalist id="cities-to">
                    {ALBERTA_CITIES.map((c) => <option key={c} value={c} />)}
                  </datalist>
                  {errors.dropoffLocation && (
                    <p className="text-red-400 text-xs mt-1">{errors.dropoffLocation.message}</p>
                  )}
                </div>
              </div>

              {/* Date + passengers */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/80 mb-1 block text-xs">Travel Date</Label>
                  <Input
                    {...register('travelDate')}
                    type="date"
                    className={cn(inputClass, 'text-white [color-scheme:dark]')}
                  />
                  {errors.travelDate && (
                    <p className="text-red-400 text-xs mt-1">{errors.travelDate.message}</p>
                  )}
                </div>
                <div>
                  <Label className="text-white/80 mb-1 block text-xs">Passengers</Label>
                  <Input
                    {...register('passengers', { valueAsNumber: true })}
                    type="number"
                    min={1}
                    max={20}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label className="text-white/80 mb-1 block text-xs">Special Requests (optional)</Label>
                <textarea
                  {...register('notes')}
                  rows={2}
                  placeholder="Child seats, accessibility needs, luggage details..."
                  className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-glacial resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-pine-dark hover:bg-gold-dark font-bold py-3 h-auto rounded-xl transition-all hover:shadow-lg hover:shadow-gold/25"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  'Request This Journey'
                )}
              </Button>

              <p className="text-white/40 text-xs text-center">
                No booking fees · Free cancellation 24h before departure
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
