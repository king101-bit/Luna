"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Lock, ArrowLeft, Calendar, User, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Course } from "@root/global"
import { formatNaira } from "@root/utils/formatCurrency"

interface PaymentFormProps {
  course: Course
  paymentMethod: "card" | "paypal"
  onPaymentMethodChange: (method: "card" | "paypal") => void
  onSuccess: () => void
  onBack: () => void
}

export function PaymentForm({
  course,
  paymentMethod,
  onPaymentMethodChange,
  onSuccess,
  onBack,
}: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value

    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value)
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value)
    } else if (field === "cvv") {
      formattedValue = value.replace(/[^0-9]/g, "").substring(0, 4)
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.firstName) newErrors.firstName = "First name is required"
    if (!formData.lastName) newErrors.lastName = "Last name is required"

    if (paymentMethod === "card") {
      if (
        !formData.cardNumber ||
        formData.cardNumber.replace(/\s/g, "").length < 16
      ) {
        newErrors.cardNumber = "Valid card number is required"
      }
      if (!formData.expiryDate || formData.expiryDate.length < 5) {
        newErrors.expiryDate = "Valid expiry date is required"
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        newErrors.cvv = "Valid CVV is required"
      }
      if (!formData.billingAddress)
        newErrors.billingAddress = "Billing address is required"
      if (!formData.city) newErrors.city = "City is required"
      if (!formData.zipCode) newErrors.zipCode = "ZIP code is required"
      if (!formData.country) newErrors.country = "Country is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    onSuccess()
  }

  return (
    <Card className="border-0 bg-white/90 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-white">
          <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Method Selection */}
          <div>
            <Label className="text-base font-medium dark:text-white">
              Payment Method
            </Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value: "card" | "paypal") =>
                onPaymentMethodChange(value)
              }
              className="mt-2"
            >
              <div className="flex items-center space-x-2 rounded-lg border p-3 dark:border-gray-700">
                <RadioGroupItem value="card" id="card" />
                <Label
                  htmlFor="card"
                  className="flex cursor-pointer items-center gap-2 dark:text-gray-300"
                >
                  <CreditCard className="h-4 w-4" />
                  Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-3 dark:border-gray-700">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label
                  htmlFor="paypal"
                  className="flex cursor-pointer items-center gap-2 dark:text-gray-300"
                >
                  <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-blue-600">
                    <span className="text-xs font-bold text-white">P</span>
                  </div>
                  PayPal
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <Label className="text-base font-medium dark:text-white">
              Contact Information
            </Label>

            <div>
              <Label htmlFor="email" className="dark:text-gray-300">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`pl-10 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${errors.email ? "border-red-500" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="dark:text-gray-300">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className={`pl-10 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${errors.firstName ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName" className="dark:text-gray-300">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={`dark:border-gray-600 dark:bg-gray-700 dark:text-white ${errors.lastName ? "border-red-500" : ""}`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Card Payment Form */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <Label className="text-base font-medium dark:text-white">
                Card Information
              </Label>

              <div>
                <Label htmlFor="cardNumber" className="dark:text-gray-300">
                  Card Number
                </Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleInputChange("cardNumber", e.target.value)
                    }
                    className={`pl-10 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${errors.cardNumber ? "border-red-500" : ""}`}
                    maxLength={19}
                  />
                </div>
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate" className="dark:text-gray-300">
                    Expiry Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        handleInputChange("expiryDate", e.target.value)
                      }
                      className={`pl-10 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${errors.expiryDate ? "border-red-500" : ""}`}
                      maxLength={5}
                    />
                  </div>
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cvv" className="dark:text-gray-300">
                    CVV
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      className={`pl-10 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${errors.cvv ? "border-red-500" : ""}`}
                      maxLength={4}
                    />
                  </div>
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                  )}
                </div>
              </div>

              {/* Billing Address */}
              <div className="space-y-4">
                <Label className="text-base font-medium dark:text-white">
                  Billing Address
                </Label>

                <div>
                  <Label
                    htmlFor="billingAddress"
                    className="dark:text-gray-300"
                  >
                    Street Address
                  </Label>
                  <Input
                    id="billingAddress"
                    placeholder="123 Main Street"
                    value={formData.billingAddress}
                    onChange={(e) =>
                      handleInputChange("billingAddress", e.target.value)
                    }
                    className={`dark:border-gray-600 dark:bg-gray-700 dark:text-white ${errors.billingAddress ? "border-red-500" : ""}`}
                  />
                  {errors.billingAddress && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.billingAddress}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="dark:text-gray-300">
                      City
                    </Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className={`dark:border-gray-600 dark:bg-gray-700 dark:text-white ${errors.city ? "border-red-500" : ""}`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="dark:text-gray-300">
                      ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                      className={`dark:border-gray-600 dark:bg-gray-700 dark:text-white ${errors.zipCode ? "border-red-500" : ""}`}
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="country" className="dark:text-gray-300">
                    Country
                  </Label>
                  <Input
                    id="country"
                    placeholder="United States"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className={`dark:border-gray-600 dark:bg-gray-700 dark:text-white ${errors.country ? "border-red-500" : ""}`}
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PayPal Message */}
          {paymentMethod === "paypal" && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                You will be redirected to PayPal to complete your payment
                securely.
              </p>
            </div>
          )}

          {/* Security Notice */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700/50">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Lock className="h-4 w-4" />
              <span>Your payment information is encrypted and secure</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isProcessing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Complete Payment ({formatNaira(course.price * 1.075)})
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
