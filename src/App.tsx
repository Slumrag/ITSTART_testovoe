import { Layout, Typography } from 'antd';
import { SeminarList } from '@/components';

function App() {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout.Content
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 16,
          paddingRight: 16,
          maxWidth: 1200,
          width: '100%',
        }}
      >
        <Typography.Title style={{ textAlign: 'center' }}>Seminars</Typography.Title>
        <SeminarList></SeminarList>
      </Layout.Content>
    </Layout>
  );
}

export default App;
