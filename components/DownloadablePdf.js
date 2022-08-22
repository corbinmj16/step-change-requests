import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { formatDate } from '../utils/helpers';

export function DownloadablePdf({ request }) {

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    inline_section: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignContent: 'flex-start',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    subtitle: {
      fontSize: 13,
      textDecoration: 'underline',
      marginBottom: 5,
    },
    category: {
      fontSize: 11, 
    },
    image: {
      width: 150
    },
    p: {
      fontSize: 11,
      marginBottom: 5,
    },
    bold: {
      fontWeight: 'bold',
    }
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{request.title}</Text>
          <Text style={styles.subtitle}>Contact</Text>

          <View>
            <Text style={styles.p}>
              <Text>Requester: </Text>
              <Text>{request.by_name ?? ''}</Text>
            </Text>
            <Text style={styles.p}>
              <Text style={styles.bold}>Requester Email: </Text>
              <Text>{request.by_email ?? ''}</Text>
            </Text>
            <Text style={styles.p}>
              <Text style={styles.bold}>Requester Phone: </Text>
              <Text>{request.by_phone ?? ''}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>General Info</Text>
          <Text style={styles.p}>Craft: {request.craft}</Text>
          <Text style={styles.p}>Created at: {formatDate(request.created_at)}</Text>
          <Text style={styles.p}>Priority: {request.priority}</Text>
          <Text style={styles.p}>Estimated Hours: {request.estimated_hours ?? ''}</Text>
          <Text style={styles.p}>Needed By: {formatDate(request.needed_by) ?? 'N/A'}</Text>
        </View>

        {request.materials.length && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Materials</Text>
            
            {request.materials.map((material, idx) => (
              <Text key={idx} style={styles.p}>
                {material.qty} - {material.item}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.subtitle}>Problem</Text>
          <Text style={styles.p}>{request.problem}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Cause</Text>
          <Text style={styles.p}>{request.cause}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Scope</Text>

          <Text style={styles.p}>{request.scope[0].details}</Text>
          <Image src={request.scope[0].images[0].publicURL} style={styles.image} />
        </View>


        

      </Page>
    </Document>
  )
}