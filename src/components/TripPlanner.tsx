'use client'

import { useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'motion/react'
import {
  Car, MapPin, PlusCircle, CheckCircle,
  Loader2, X, ChevronRight, ChevronLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn, EASE_OUT_EXPO } from '@/lib/utils'

const STEPS = [
  { id: 1, title: 'Vehicle', icon: Car },
  { id: 2, title: 'Route', icon: MapPin },
  { id: 3, title: 'Add Stops', icon: PlusCircle },
  { id: 4, title: 'Confirm', icon: CheckCircle },
]

const VEHICLES = [
  { id: 'sedan', label: 'Sedan', emoji: '🚗', capacity: '1–3 passengers', price: 'From $79' },
  { id: 'suv', label: 'SUV', emoji: '🚙', capacity: '1–6 passengers', price: 'From $99' },
  { id: 'minivan', label: 'Minivan', emoji: '🚐', capacity: '1–8 passengers', price: 'From $129' },
  { id: 'sprinter', label: 'Sprinter', emoji: '🚌', capacity: '1–14 passengers', price: 'From $199' },
]

const ALBERTA_CITIES = [
  'Calgary', 'Calgary YYC Airport', 'Banff', 'Canmore',
  'Lake Louise', 'Jasper', 'Drumheller', 'Edmonton',
  'Edmonton YEG Airport', 'Icefields Parkway',
]

const tripSchema = z.object({
  vehicleType: z.enum(['sedan', 'suv', 'minivan', 'sprinter'], {
    required_error: 'Please select a vehicle',
  }),
  passengerCount: z.number().min(1).max(20),
  departureCity: z.string().min(1, 'Departure city required'),
  destination: z.string().min(1, 'Destination required'),
  departureDate: z.string().min(1, 'Date required'),
  departureTime: z.string().min(1, 'Time required'),
  additionalStops: z
    .array(z.object({ location: z.string().min(1, 'Location required') }))
    .max(5),
  contactName: z.string().min(2, 'Full name required'),
  contactEmail: z.string().email('Valid email required'),
  contactPhone: z.string().min(7, 'Valid phone required'),
  specialRequests: z.string().max(500).optional(),
})

type TripData = z.infer<typeof tripSchema>

const STEP_FIELDS: Record<number, (keyof TripData)[]> = {
  1: ['vehicleType', 'passengerCount'],
  2: ['departureCity', 'destination', 'departureDate', 'departureTime'],
  3: ['additionalStops'],
  4: ['contactName', 'contactEmail', 'contactPhone'],
}

const inputClass =
  'bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-glacial'

export function TripPlanner() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<TripData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      passengerCount: 2,
      additionalStops: [],
      vehicleType: undefined,
    },
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'additionalStops',
  })

  const nextStep = async () => {
    const valid = await form.trigger(STEP_FIELDS[currentStep])
    if (valid) setCurrentStep((s) => Math.min(s + 1, 4))
  }

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1))

  const onSubmit = async (data: TripData) => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    console.log('Trip plan submitted:', data)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const vehicleValue = form.watch('vehicleType')
  const formValues = form.watch()

  return (
    <div className="bg-pine-light py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 id="trip-planner-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Plan My Trip
          </h2>
          <p className="text-white/60 text-lg">
            Customize every detail — we&apos;ll build the perfect Alberta journey for you.
          </p>
        </div>

        <div className="glass-card-dark rounded-2xl p-6 lg:p-10">
          {/* Step indicators */}
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isDone = step.id < currentStep
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={cn(
                        'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300',
                        isActive ? 'bg-gold text-pine-dark' : isDone ? 'bg-glacial text-pine-dark' : 'bg-white/10 text-white/40'
                      )}
                    >
                      {isDone ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className={cn(
                      'text-xs font-medium hidden sm:block transition-colors',
                      isActive ? 'text-gold' : isDone ? 'text-glacial' : 'text-white/30'
                    )}>
                      {step.title}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={cn(
                      'flex-1 h-px mx-2 transition-all duration-500',
                      isDone ? 'bg-glacial' : 'bg-white/10'
                    )} />
                  )}
                </div>
              )
            })}
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-white/10 rounded-full mt-4 mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-gold rounded-full"
              animate={{ width: `${(currentStep / 4) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Step content */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 rounded-full bg-glacial/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="text-glacial w-10 h-10" />
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-3">Trip Plan Received!</h3>
                  <p className="text-white/60 mb-6 max-w-sm mx-auto">
                    Our team will reach out within 2 hours with a personalized quote and itinerary.
                  </p>
                  <Button
                    type="button"
                    onClick={() => { setIsSuccess(false); setCurrentStep(1); form.reset() }}
                    className="bg-gold text-pine-dark hover:bg-gold-dark font-semibold"
                  >
                    Plan Another Trip
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* ── STEP 1: Vehicle ── */}
                  {currentStep === 1 && (
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-5">Choose Your Vehicle</h3>
                      <Controller
                        name="vehicleType"
                        control={form.control}
                        render={({ field }) => (
                          <div className="grid grid-cols-2 gap-3 mb-5">
                            {VEHICLES.map((v) => (
                              <button
                                key={v.id}
                                type="button"
                                onClick={() => field.onChange(v.id)}
                                className={cn(
                                  'text-left p-4 rounded-xl border transition-all duration-200',
                                  field.value === v.id
                                    ? 'border-gold bg-gold/10'
                                    : 'border-white/10 bg-white/5 hover:border-white/30'
                                )}
                              >
                                <div className="text-2xl mb-2">{v.emoji}</div>
                                <div className="text-white font-semibold text-sm">{v.label}</div>
                                <div className="text-white/50 text-xs">{v.capacity}</div>
                                <div className="text-gold text-xs font-medium mt-1">{v.price}</div>
                              </button>
                            ))}
                          </div>
                        )}
                      />
                      {form.formState.errors.vehicleType && (
                        <p className="text-red-400 text-sm mb-4">{form.formState.errors.vehicleType.message}</p>
                      )}

                      <div>
                        <Label className="text-white/80 mb-1 block text-sm">Number of Passengers</Label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min={1}
                            max={20}
                            {...form.register('passengerCount', { valueAsNumber: true })}
                            className="flex-1 h-1.5 rounded-full bg-white/20 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
                          />
                          <span className="text-white font-semibold w-6 text-center">
                            {formValues.passengerCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 2: Route ── */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-white font-semibold text-lg mb-5">Select Your Route</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-white/80 mb-1 block text-sm">Departure City</Label>
                          <Input
                            {...form.register('departureCity')}
                            placeholder="Calgary"
                            list="planner-cities-from"
                            className={inputClass}
                          />
                          <datalist id="planner-cities-from">
                            {ALBERTA_CITIES.map((c) => <option key={c} value={c} />)}
                          </datalist>
                          {form.formState.errors.departureCity && (
                            <p className="text-red-400 text-xs mt-1">{form.formState.errors.departureCity.message}</p>
                          )}
                        </div>
                        <div>
                          <Label className="text-white/80 mb-1 block text-sm">Destination</Label>
                          <Input
                            {...form.register('destination')}
                            placeholder="Banff"
                            list="planner-cities-to"
                            className={inputClass}
                          />
                          <datalist id="planner-cities-to">
                            {ALBERTA_CITIES.map((c) => <option key={c} value={c} />)}
                          </datalist>
                          {form.formState.errors.destination && (
                            <p className="text-red-400 text-xs mt-1">{form.formState.errors.destination.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-white/80 mb-1 block text-sm">Date</Label>
                          <Input
                            {...form.register('departureDate')}
                            type="date"
                            className={cn(inputClass, '[color-scheme:dark]')}
                          />
                          {form.formState.errors.departureDate && (
                            <p className="text-red-400 text-xs mt-1">{form.formState.errors.departureDate.message}</p>
                          )}
                        </div>
                        <div>
                          <Label className="text-white/80 mb-1 block text-sm">Time</Label>
                          <Input
                            {...form.register('departureTime')}
                            type="time"
                            className={cn(inputClass, '[color-scheme:dark]')}
                          />
                          {form.formState.errors.departureTime && (
                            <p className="text-red-400 text-xs mt-1">{form.formState.errors.departureTime.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 3: Stops ── */}
                  {currentStep === 3 && (
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-white font-semibold text-lg">Add Stops Along the Way</h3>
                        <span className="text-white/40 text-sm">{fields.length}/5 stops</span>
                      </div>

                      <div className="space-y-3 mb-5">
                        <AnimatePresence>
                          {fields.map((field, index) => (
                            <motion.div
                              key={field.id}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="flex items-center gap-3"
                            >
                              <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-gold text-xs font-bold">{index + 1}</span>
                              </div>
                              <Input
                                {...form.register(`additionalStops.${index}.location`)}
                                placeholder={`Stop ${index + 1} location`}
                                list="planner-cities-stops"
                                className={cn(inputClass, 'flex-1')}
                              />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-white/40 hover:text-red-400 transition-colors p-1"
                                aria-label="Remove stop"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        <datalist id="planner-cities-stops">
                          {ALBERTA_CITIES.map((c) => <option key={c} value={c} />)}
                        </datalist>
                      </div>

                      {fields.length < 5 && (
                        <button
                          type="button"
                          onClick={() => append({ location: '' })}
                          className="flex items-center gap-2 text-sm text-glacial hover:text-white transition-colors py-2"
                        >
                          <PlusCircle className="w-4 h-4" />
                          Add a stop
                        </button>
                      )}

                      {fields.length === 0 && (
                        <p className="text-white/40 text-sm italic">
                          No stops added — we&apos;ll drive direct to your destination.
                        </p>
                      )}
                    </div>
                  )}

                  {/* ── STEP 4: Contact & Review ── */}
                  {currentStep === 4 && (
                    <div className="space-y-5">
                      <h3 className="text-white font-semibold text-lg mb-1">Review & Contact Info</h3>

                      {/* Trip summary */}
                      <div className="glass-card rounded-xl p-4 text-sm space-y-1.5">
                        <div className="flex justify-between text-white/80">
                          <span className="text-white/50">Vehicle</span>
                          <span className="font-medium capitalize">{vehicleValue || '—'}</span>
                        </div>
                        <div className="flex justify-between text-white/80">
                          <span className="text-white/50">Route</span>
                          <span className="font-medium">
                            {formValues.departureCity || '—'} → {formValues.destination || '—'}
                          </span>
                        </div>
                        <div className="flex justify-between text-white/80">
                          <span className="text-white/50">Date & Time</span>
                          <span className="font-medium">
                            {formValues.departureDate || '—'} at {formValues.departureTime || '—'}
                          </span>
                        </div>
                        <div className="flex justify-between text-white/80">
                          <span className="text-white/50">Passengers</span>
                          <span className="font-medium">{formValues.passengerCount}</span>
                        </div>
                        {fields.length > 0 && (
                          <div className="flex justify-between text-white/80">
                            <span className="text-white/50">Stops</span>
                            <span className="font-medium">{fields.length}</span>
                          </div>
                        )}
                      </div>

                      {/* Contact */}
                      <div className="space-y-3">
                        <div>
                          <Label className="text-white/80 mb-1 block text-sm">Full Name</Label>
                          <Input {...form.register('contactName')} placeholder="Your name" className={inputClass} />
                          {form.formState.errors.contactName && (
                            <p className="text-red-400 text-xs mt-1">{form.formState.errors.contactName.message}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-white/80 mb-1 block text-sm">Email</Label>
                            <Input {...form.register('contactEmail')} type="email" placeholder="you@email.com" className={inputClass} />
                            {form.formState.errors.contactEmail && (
                              <p className="text-red-400 text-xs mt-1">{form.formState.errors.contactEmail.message}</p>
                            )}
                          </div>
                          <div>
                            <Label className="text-white/80 mb-1 block text-sm">Phone</Label>
                            <Input {...form.register('contactPhone')} type="tel" placeholder="+1 403..." className={inputClass} />
                            {form.formState.errors.contactPhone && (
                              <p className="text-red-400 text-xs mt-1">{form.formState.errors.contactPhone.message}</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <Label className="text-white/80 mb-1 block text-sm">Special Requests (optional)</Label>
                          <textarea
                            {...form.register('specialRequests')}
                            rows={2}
                            placeholder="Child seats, accessibility needs, luggage details..."
                            className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-glacial resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            {!isSuccess && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-gold text-pine-dark hover:bg-gold-dark font-semibold px-6"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gold text-pine-dark hover:bg-gold-dark font-bold px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Submit Trip Plan'
                    )}
                  </Button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
