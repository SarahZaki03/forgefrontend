import React from "react";
import Header from "../components/Header/Header";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    border: 2,
  },
});

const Pdf = () => {
  return (
    <div>
      <Header />
      <div className="pdf-section">
        <PDFViewer className="fit-width">
          <Document title={"title1"} pageMode="fullScreen">
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>Section #1</Text>
              </View>
              <View style={styles.section}>
                <Text>Section #2</Text>
              </View>
            </Page>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>Section #1</Text>
              </View>
              <View style={styles.section}>
                <Text>Section #2</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
};

export default Pdf;
