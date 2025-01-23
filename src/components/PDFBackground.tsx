import { View, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  logo: {
    position: 'absolute',
    top: 30,
    right: 30,
    width: 150, // Dostosuj szerokość według potrzeb
    zIndex: 1,
  },
});

const PDFBackground = () => (
  <View style={styles.background}>
    <Image 
      src="background_A4.png" 
      style={styles.backgroundImage}
    />
    <Image 
      src="images.jpeg"
      style={styles.logo}
    />
  </View>
);

export default PDFBackground;
