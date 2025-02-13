import {
    Document, 
    Page, 
    Text, 
    View, 
    StyleSheet,
    Font,
    Image 
} from '@react-pdf/renderer';
import { Order } from '@/app/types/order';
import PDFBackground from './PDFBackground';

// Rejestracja fontów
Font.register({
  family: 'Roboto',
  src: '/fonts/Roboto-Regular.ttf',
});

Font.register({
  family: 'Roboto-Bold',
  src: '/fonts/Roboto-Bold.ttf',
});

// Zaktualizowane typy
export interface OrdersPDFProps {
  orders: Order[];
  clientData: {
    name: string;
    address: string;
    email: string;
    phone: string;
    offerNumber: string;
    offerDate: string;
  };
  additionalInfo: string[];
}

// Style dla PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Roboto',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    position: 'relative',
    height: 100, // Stała wysokość dla nagłówka
  },
  companyDetails: {
    flex: 1,
  },
  logo: {
    width: 150,
  },
  companyInfo: {
    marginBottom: 10,
    fontFamily: 'Roboto',
    color: '#000000',
    fontSize: 12,
  },
  mainContent: {
    flexGrow: 1,
  },
  title: {
    color: '#2563eb',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  subtitle: {
    color: '#000000',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  clientTable: {
    fontSize: 14,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000000',
  },
  clientRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  clientLabelCell: {
    width: '30%',
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    fontFamily: 'Roboto-Bold',
    color: '#000000',
  },
  clientValueCell: {
    width: '70%',
    padding: 8,
    fontFamily: 'Roboto',
    color: '#000000',
  },
  offerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    fontFamily: 'Roboto',
    fontSize: 14,
  },
  detailsHeader: {
    backgroundColor: '#2563eb',
    padding: 8,
    marginBottom: 4,
  },
  detailsText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  tableContainer: {
    width: 'auto',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000000',
  },
  table: {
    width: 'auto',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  tableHeader: {
    backgroundColor: '#ffffff',
    fontFamily: 'Roboto-Bold',
  },
  tableCell: {
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#000000',
  },
  productCell: { width: '35%' },
  materialCell: { width: '20%' },
  groupCell: { width: '15%' },
  quantityCell: { width: '10%' },
  priceCell: { width: '20%' },
  discountBox: {
    marginTop: 20,
    padding: 10,
    border: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  discountText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    marginBottom: 5,
  },
  discountPrice: {
    fontFamily: 'Roboto',
    fontSize: 12,
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    marginBottom: 10,
  },
  additionalInfo: {
    fontSize: 12,
    marginTop: 10,
    border: 1,
    padding: 10,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#000000',
  },
  additionalProductRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  additionalProductCell: {
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    width: '100%',
  },
});

const OrdersPDF = ({ orders, clientData, additionalInfo }: OrdersPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PDFBackground />
        
        {/* Stały nagłówek */}
        <View style={styles.header} fixed>
          <View style={styles.companyDetails}>
            <Text style={styles.companyInfo}>Czeremchowa 2a, 81-079 Gdynia</Text>
            <Text style={styles.companyInfo}>Nr kontaktowy: 530 338 118</Text>
            <Text style={styles.companyInfo}>Email: kzysko@rolety3miasto.pl</Text>
          </View>
          <Image src="images.jpeg" style={styles.logo} />
        </View>

        {/* Główna treść */}
        <View style={styles.mainContent}>
          <Text style={styles.title}>OFERTA SPRZEDAŻOWA</Text>
          <Text style={styles.subtitle}>
            W związku z wykonanym pomiarem przedstawiam następującą ofertę:
          </Text>

          {/* Tabela z danymi klienta */}
          <View style={styles.clientTable}>
            <View style={styles.clientRow}>
              <Text style={styles.clientLabelCell}>NAZWA WYCENY</Text>
              <Text style={styles.clientValueCell}>{clientData.name}</Text>
            </View>
            <View style={styles.clientRow}>
              <Text style={styles.clientLabelCell}>ADRES</Text>
              <Text style={styles.clientValueCell}>{clientData.address}</Text>
            </View>
            <View style={styles.clientRow}>
              <Text style={styles.clientLabelCell}>EMAIL</Text>
              <Text style={styles.clientValueCell}>{clientData.email}</Text>
            </View>
            <View style={styles.clientRow}>
              <Text style={styles.clientLabelCell}>NR TELEFONU</Text>
              <Text style={styles.clientValueCell}>{clientData.phone}</Text>
            </View>
          </View>

          {/* Numer oferty i data */}
          <View style={styles.offerDetails}>
            <Text>NR OFERTY: {clientData.offerNumber}</Text>
            <Text>DATA: {new Date(clientData.offerDate).toLocaleDateString()}</Text>
          </View>

          {/* Nagłówek szczegółów */}
          <View style={styles.detailsHeader}>
            <Text style={styles.detailsText}>SZCZEGÓŁY</Text>
          </View>

          {/* Tabela produktów */}
          <View style={styles.tableContainer}>
            <View style={[styles.tableRow, styles.tableHeader]} fixed>
              <Text style={[styles.tableCell, styles.productCell]}>PRODUKT</Text>
              <Text style={[styles.tableCell, styles.materialCell]}>MATERIAŁ</Text>
              <Text style={[styles.tableCell, styles.groupCell]}>GRUPA</Text>
              <Text style={[styles.tableCell, styles.quantityCell]}>ILOŚĆ</Text>
              <Text style={[styles.tableCell, styles.priceCell]}>KWOTA</Text>
            </View>
            
            {orders.map((order, orderIndex) => 
              Object.values(order.products).map((product, productIndex) => (
                <View key={`${orderIndex}-${productIndex}`} wrap={false}>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.productCell]}>{product.product}</Text>
                    <Text style={[styles.tableCell, styles.materialCell]}>{product.material}</Text>
                    <Text style={[styles.tableCell, styles.groupCell]}>{product.group}</Text>
                    <Text style={[styles.tableCell, styles.quantityCell]}>{product.quantity}</Text>
                    <Text style={[styles.tableCell, styles.priceCell]}>{product.price} zł</Text>
                  </View>
                  {product.additionalProduct && (
                    <View style={[styles.tableRow]} wrap={false}>
                      <Text style={[styles.tableCell, { width: '100%' }]}>
                        + {product.additionalProduct}
                      </Text>
                    </View>
                  )}
                </View>
              ))
            )}
          </View>

          {/* Dodatkowe informacje - pokazywane tylko gdy są niepuste i checkbox jest zaznaczony */}
          {additionalInfo.length > 0 && additionalInfo[0] && (
            <View wrap={false}>
              <Text style={styles.additionalInfoTitle}>DODATKOWE INFORMACJE:</Text>
              <View style={styles.additionalInfo}>
                {additionalInfo.map((info, index) => (
                  <Text key={index}>{info}</Text>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Numerowanie stron */}
        <Text 
          style={styles.pageNumber} 
          render={({ pageNumber, totalPages }) => 
            totalPages > 1 ? `${pageNumber} / ${totalPages}` : ''
          } 
          fixed
        />
      </Page>
    </Document>
  );
};

export default OrdersPDF;