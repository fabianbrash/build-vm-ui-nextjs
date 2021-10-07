import { ChakraProvider } from "@chakra-ui/react"
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();


function MyApp({ Component, pageProps }) {
  return (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
     <Component {...pageProps} />
    </ChakraProvider>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
  </QueryClientProvider>
  
  );
}

export default MyApp
