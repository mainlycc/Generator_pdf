'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PDFViewer, BlobProvider } from '@react-pdf/renderer';
import OrdersPDF from '@/components/OrdersPDF';
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash } from 'lucide-react';
import { Order } from '@/app/types/order';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [clientData, setClientData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    offerNumber: new Date().getTime().toString().slice(-5),
    offerDate: new Date().toISOString().split('T')[0]
  });
  const [discount, setDiscount] = useState('0');
  const [showDiscount, setShowDiscount] = useState(false);
  const { register, handleSubmit, reset } = useForm<Order>();
  const [productRows, setProductRows] = useState([{ id: 0 }]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    if (date) {
      setClientData(prev => ({
        ...prev,
        offerDate: date.toISOString().split('T')[0]
      }));
    }
  }, [date]);

  const handleAddOrder = (data: any) => {
    // Mapuj produkty i ustaw cenę na 0 jeśli jest pusta
    const processedData = {
      products: Object.keys(data.products).reduce((acc, key) => {
        const product = data.products[key];
        return {
          ...acc,
          [key]: {
            ...product,
            price: product.price || 0, // Jeśli cena jest pusta (undefined, null lub ''), ustaw 0
            quantity: product.quantity || 0 // To samo dla ilości
          }
        };
      }, {})
    };

    setOrders([...orders, processedData]);
    toast.success("Dodano nowe zlecenie");
    reset();
    setProductRows([{ id: 0 }]); // Reset product rows after submission
  };

  const handleAddProductRow = () => {
    setProductRows([...productRows, { id: productRows.length }]);
  };

  const handleRemoveProductRow = (id: number) => {
    if (productRows.length > 1) {
      setProductRows(productRows.filter(row => row.id !== id));
    }
  };

  return (
    <div>
      <div 
        className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" 
      />
      
      <div className="min-h-screen p-8">
        <Toaster />
        <div className="max-w-4xl mx-auto space-y-8">
          <Tabs defaultValue="generator">
            <div className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="generator">Generator</TabsTrigger>
                <TabsTrigger value="orders">Wystawione zlecenia</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="generator">
              <div className="space-y-8">
                <h1 className="text-3xl font-bold text-center">Generator PDF ze zleceniami</h1>
                
                {/* Pojedyncza karta dla danych wyceny i szczegółów */}
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-200">
                  {/* Dane wyceny */}
                  <h2 className="text-2xl font-bold text-center mb-8">Dane wyceny</h2>
                  <div className="grid grid-cols-1 gap-6 mb-12">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm text-gray-600 font-medium">
                        Nazwa wyceny
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="np. Wycena rolet - ul. Kwiatowa 5"
                        value={clientData.name}
                        onChange={(e) => setClientData({...clientData, name: e.target.value})}
                        className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="address" className="text-sm text-gray-600 font-medium">
                        Adres
                      </label>
                      <input
                        id="address"
                        type="text"
                        placeholder="np. ul. Kwiatowa 5, 80-000 Gdańsk"
                        value={clientData.address}
                        onChange={(e) => setClientData({...clientData, address: e.target.value})}
                        className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm text-gray-600 font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="np. jan.kowalski@email.com"
                        value={clientData.email}
                        onChange={(e) => setClientData({...clientData, email: e.target.value})}
                        className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm text-gray-600 font-medium">
                        Nr telefonu
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="np. 123 456 789"
                        value={clientData.phone}
                        onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                        className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between gap-4">
                        <div className="w-1/2">
                          <label htmlFor="offerNumber" className="text-sm text-gray-600 font-medium">
                            Numer oferty
                          </label>
                          <input
                            id="offerNumber"
                            type="text"
                            placeholder="np. 12345"
                            value={clientData.offerNumber}
                            onChange={(e) => setClientData({...clientData, offerNumber: e.target.value})}
                            className="mt-2 p-3 border rounded-md bg-gray-50 hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors w-full"
                          />
                        </div>
                        
                        <div className="w-1/2">
                          <label className="text-sm text-gray-600 font-medium">
                            Data oferty
                          </label>
                          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                            <PopoverTrigger asChild>
                              <input
                                type="text"
                                readOnly
                                value={date ? format(date, 'dd.MM.yyyy', { locale: pl }) : ''}
                                className="mt-2 p-3 border rounded-md bg-gray-50 hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors w-full cursor-pointer"
                                placeholder="Wybierz datę..."
                              />
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(newDate) => {
                                  setDate(newDate);
                                  setIsCalendarOpen(false);
                                }}
                                locale={pl}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Szczegóły */}
                  <h2 className="text-2xl font-bold text-center mb-8">Szczegóły</h2>
                  <form onSubmit={handleSubmit(handleAddOrder)} className="space-y-4">
                    {productRows.map((row, index) => (
                      <div key={row.id} className="flex gap-4 items-start">
                        <div className="space-y-2 w-1/4">
                          <label className="text-sm text-gray-600 font-medium">Produkt</label>
                          <input
                            {...register(`products.${row.id}.product`)}
                            placeholder="np. Roleta dzień/noc"
                            className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors w-full"
                          />
                        </div>
                        <div className="space-y-2 w-1/4">
                          <label className="text-sm text-gray-600 font-medium">Materiał</label>
                          <input
                            {...register(`products.${row.id}.material`)}
                            placeholder="np. Tkanina XYZ"
                            className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors w-full"
                          />
                        </div>
                        <div className="space-y-2 w-1/6">
                          <label className="text-sm text-gray-600 font-medium">Grupa</label>
                          <input
                            {...register(`products.${row.id}.group`)}
                            placeholder="np. A"
                            className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors w-full"
                          />
                        </div>
                        <div className="space-y-2 w-1/6">
                          <label className="text-sm text-gray-600 font-medium">Ilość</label>
                          <input
                            {...register(`products.${row.id}.quantity`, { valueAsNumber: true })}
                            type="number"
                            placeholder="np. 2"
                            className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors w-full"
                          />
                        </div>
                        <div className="space-y-2 w-1/6">
                          <label className="text-sm text-gray-600 font-medium">Cena</label>
                          <input
                            {...register(`products.${row.id}.price`, { valueAsNumber: true })}
                            type="number"
                            placeholder="np. 299.99"
                            className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors w-full"
                          />
                        </div>
                        {productRows.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => handleRemoveProductRow(row.id)}
                            className="flex-shrink-0"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddProductRow}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Dodaj kolejny produkt
                      </Button>
                    </div>

                    {/* Sekcja rabatu */}
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox 
                        id="showDiscount" 
                        checked={showDiscount}
                        onCheckedChange={(checked) => {
                          setShowDiscount(checked as boolean);
                          if (!checked) {
                            setDiscount('0');
                          }
                        }}
                      />
                      <label
                        htmlFor="showDiscount"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Uwzględnij rabat w wycenie
                      </label>
                    </div>

                    {showDiscount && (
                      <div className="flex items-center gap-2 mb-4">
                        <label htmlFor="discount" className="font-semibold">
                          Wysokość rabatu (%):
                        </label>
                        <input
                          id="discount"
                          type="number"
                          min="0"
                          max="100"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                          className="p-2 border rounded w-24 bg-gray-50 hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                        />
                      </div>
                    )}

                    <div className="flex justify-center">
                      <Button type="submit" className="px-8">
                        Dodaj zlecenie
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="space-y-8">
                <h1 className="text-3xl font-bold text-center">Wystawione zlecenia</h1>
                
                {orders.length > 0 ? (
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-200">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produkt</TableHead>
                          <TableHead>Materiał</TableHead>
                          <TableHead>Grupa</TableHead>
                          <TableHead>Ilość</TableHead>
                          <TableHead>Cena</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order, orderIndex) => 
                          Object.values(order.products).map((product, productIndex) => (
                            <TableRow key={`${orderIndex}-${productIndex}`}>
                              <TableCell>{product.product}</TableCell>
                              <TableCell>{product.material}</TableCell>
                              <TableCell>{product.group}</TableCell>
                              <TableCell>{product.quantity}</TableCell>
                              <TableCell>{product.price} zł</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>

                    {/* Przyciski PDF */}
                    <div className="flex gap-4 justify-center mt-6">
                      <BlobProvider document={
                        <OrdersPDF 
                          orders={orders} 
                          clientData={clientData} 
                          discount={showDiscount ? discount : '0'} 
                        />
                      }>
                        {({ blob, url, loading }) => (
                          <Button
                            asChild
                            variant="default"
                            disabled={loading}
                            onClick={() => {
                              if (!loading && url) {
                                toast.success("PDF został wygenerowany!");
                              }
                            }}
                          >
                            <a href={url || '#'} download="oferta.pdf">
                              {loading ? "Generowanie..." : "Pobierz PDF"}
                            </a>
                          </Button>
                        )}
                      </BlobProvider>
                      
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setOrders([]);
                          toast.info("Lista zleceń została wyczyszczona");
                        }}
                      >
                        Wyczyść listę
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    Brak wystawionych zleceń
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Podgląd PDF */}
            {orders.length > 0 && (
              <div className="h-[600px] w-full bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-2">
                <PDFViewer className="w-full h-full">
                  <OrdersPDF 
                    orders={orders} 
                    clientData={clientData} 
                    discount={showDiscount ? discount : '0'} 
                  />
                </PDFViewer>
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}