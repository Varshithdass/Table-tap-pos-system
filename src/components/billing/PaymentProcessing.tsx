
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Gift, 
  AlertCircle,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PaymentProcessing = () => {
  const [invoice, setInvoice] = useState("INV-87654321");
  const [amount, setAmount] = useState("1180.00");
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [upiId, setUpiId] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [changeAmount, setChangeAmount] = useState<number | null>(null);

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
    setShowQR(method === "upi");
    setError(null);
    setCompleted(false);
    setChangeAmount(null);
  };

  const handleCashPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const cashReceived = parseFloat(formData.get("cashAmount") as string);
    const invoiceAmount = parseFloat(amount);

    if (cashReceived < invoiceAmount) {
      setError("Cash received is less than invoice amount");
      return;
    }

    setProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      setChangeAmount(cashReceived - invoiceAmount);
    }, 1000);
  };

  const handleCardPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 2000);
  };

  const handleUpiPayment = () => {
    if (!upiId && !showQR) {
      setError("Please enter a valid UPI ID");
      return;
    }

    setProcessing(true);
    // Simulate UPI processing
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 2000);
  };

  const resetPayment = () => {
    setPaymentMethod(null);
    setCompleted(false);
    setError(null);
    setChangeAmount(null);
    setShowQR(false);
    setUpiId("");
  };

  const generateNewInvoice = () => {
    setInvoice(`INV-${Math.floor(Math.random() * 90000000) + 10000000}`);
    setAmount((Math.floor(Math.random() * 5000) + 500).toFixed(2));
    resetPayment();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Invoice Details */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Invoice Number</Label>
                <div className="text-lg font-medium">{invoice}</div>
              </div>
              <div>
                <Label>Amount</Label>
                <div className="text-2xl font-bold">₹{amount}</div>
              </div>
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={generateNewInvoice}
                >
                  Load Different Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              {!paymentMethod ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline"
                    className="flex flex-col h-24 space-y-2"
                    onClick={() => handlePaymentMethodSelect("card")}
                  >
                    <CreditCard className="h-6 w-6" />
                    <span>Card</span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex flex-col h-24 space-y-2"
                    onClick={() => handlePaymentMethodSelect("upi")}
                  >
                    <Smartphone className="h-6 w-6" />
                    <span>UPI</span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex flex-col h-24 space-y-2"
                    onClick={() => handlePaymentMethodSelect("cash")}
                  >
                    <Banknote className="h-6 w-6" />
                    <span>Cash</span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex flex-col h-24 space-y-2"
                    onClick={() => handlePaymentMethodSelect("gift_card")}
                  >
                    <Gift className="h-6 w-6" />
                    <span>Gift Card</span>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Error Message */}
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Success Message */}
                  {completed && (
                    <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription>
                        Payment completed successfully!
                        {changeAmount !== null && (
                          <div className="font-bold mt-1">
                            Change to return: ₹{changeAmount.toFixed(2)}
                          </div>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Card Payment */}
                  {paymentMethod === "card" && !completed && (
                    <form onSubmit={handleCardPayment} className="space-y-4">
                      <div>
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input 
                          id="card-number" 
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input 
                            id="expiry" 
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            id="cvv" 
                            placeholder="123"
                            type="password"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={processing}
                      >
                        {processing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Process Card Payment"
                        )}
                      </Button>
                    </form>
                  )}

                  {/* UPI Payment */}
                  {paymentMethod === "upi" && !completed && (
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant={showQR ? "default" : "outline"}
                          onClick={() => setShowQR(true)}
                        >
                          Scan QR
                        </Button>
                        <Button 
                          variant={!showQR ? "default" : "outline"}
                          onClick={() => setShowQR(false)}
                        >
                          Enter UPI ID
                        </Button>
                      </div>
                      
                      {showQR ? (
                        <div className="flex flex-col items-center space-y-4">
                          <div className="border-2 border-dashed p-2 rounded-lg">
                            {/* Placeholder for QR code */}
                            <div className="w-64 h-64 bg-gray-100 flex items-center justify-center rounded">
                              <span className="text-sm text-gray-500">
                                [UPI QR Code for ₹{amount}]
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-center text-muted-foreground">
                            Scan this QR code using any UPI app (Google Pay, PhonePe, Paytm, etc.)
                          </p>
                          <Button 
                            className="w-full"
                            disabled={processing}
                            onClick={handleUpiPayment}
                          >
                            {processing ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying Payment...
                              </>
                            ) : (
                              "Payment Received"
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="upi-id">UPI ID</Label>
                            <Input 
                              id="upi-id" 
                              placeholder="example@upi"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              required
                            />
                          </div>
                          <Button 
                            className="w-full"
                            disabled={processing || !upiId}
                            onClick={handleUpiPayment}
                          >
                            {processing ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Pay ₹" + amount
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Cash Payment */}
                  {paymentMethod === "cash" && !completed && (
                    <form onSubmit={handleCashPayment} className="space-y-4">
                      <div>
                        <Label htmlFor="cashAmount">Cash Received</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">₹</span>
                          <Input 
                            id="cashAmount" 
                            name="cashAmount"
                            type="number"
                            className="pl-8"
                            placeholder={amount}
                            defaultValue={amount}
                            min={amount}
                            step="0.01"
                            required
                          />
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={processing}
                      >
                        {processing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Process Cash Payment"
                        )}
                      </Button>
                    </form>
                  )}

                  {/* Gift Card Payment */}
                  {paymentMethod === "gift_card" && !completed && (
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="gift-card">Gift Card Number</Label>
                        <Input 
                          id="gift-card" 
                          placeholder="Enter gift card number"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pin">PIN (if applicable)</Label>
                        <Input 
                          id="pin" 
                          type="password"
                          placeholder="Enter PIN"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={processing}
                      >
                        {processing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Validate & Process"
                        )}
                      </Button>
                    </form>
                  )}

                  {completed && (
                    <div className="flex space-x-4 pt-4">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={resetPayment}
                      >
                        New Payment
                      </Button>
                      <Button className="w-full">
                        Print Receipt
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            {paymentMethod && !completed && (
              <CardFooter>
                <Button 
                  variant="outline"
                  onClick={resetPayment}
                  className="w-full"
                >
                  Cancel Payment
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
