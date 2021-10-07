import React, { useState, useRef, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Flex, Spacer,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input, Select, Box, Button, Heading, Code, Spinner } from "@chakra-ui/react"
    

const fetchVMData = async () => {
  return await axios.get('https://fabianbrash.npkn.net/vm-build-data')
}
function BuildForm() {

  const { isLoading, data, isError, error } = useQuery('vm-form-data', fetchVMData);
  //console.log(data?.data);
    const [formData, setFormData] = useState({
      vmName: '',
      clusterSelect: '',
      datastoreSelect: '',
      hostSelect: '',
      templateSelect: '',
    });
    const [clusters, setClusters] = useState([]);
    const [ds, setDS] = useState([]);
    const [hosts, setHosts] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [apiData, setApiData] = useState({
      theClusters: [],
      theDataStores: [],
      theHosts: [],
      theTemplates: [],
    });
    const [payload, setPayload] = useState('');
    const formRef = useRef(null);
    //const [isLoading, setLoading] = useState(true);
    //const [error, setError] = useState(null);

    const handleChange = e => {
        //console.log(e);
        /*const { name, value } = e.target;
        if(name === 'cluster-select') setCluster(value);
        if(name === 'datastore-select') setDatastore(value);
        if(name === 'host-select') setHost(value);
        if(name === 'template-select') setTemplate(value);
        if(name === 'vm-name') setVM(value );*/

        const newFormData = {
          ...formData,
          [e.target.name]: e.target.value,

        };

        setFormData(newFormData);


        const payLoadData = {
          guest_customization_spec: {
              name: "Srv19"
          },
          name: newFormData.vmName,
          placement: {
              cluster: newFormData.clusterSelect,
              datastore: newFormData.datastoreSelect,
              host: newFormData.hostSelect
          },
          power_on: true,
          source: newFormData.templateSelect
      }
  
      setPayload(JSON.stringify(payLoadData),null, 1);

    }

    const handleClick = () => {

  }
  
  const handleReset = () => {
    setPayload('');
    setFormData({
      vmName: '',
      clusterSelect: '',
      datastoreSelect: '',
      hostSelect: '',
      templateSelect: '',
    });
    formRef.current.reset();

  }

  if(isLoading) {
    return (
    <Flex justifyContent="center" alignItems="center" w="100%" mb={["0px","20px"]} mt={["200px", "200px"]}>
      <Spinner size="xl" color="purple.800" />
    </Flex>
  )}

  if(isError) return (
    <Flex justifyContent="center" alignItems="center" w="100%" mb={["0px","20px"]} mt={["200px", "200px"]}>
      <h2>Error...{error.message}</h2>
  </Flex>
  
  );

    return (

        <Flex justifyContent="center" alignItems="center" w="100%" mb={["0px","20px"]} mt={["0px", "30px"]}>
    
        {/* { loading ? (
            <Spinner size="xl" color="purple.800" />
        ) : ( */}
          <Flex direction="column" background="gray.100" p={20} rounded={["null","lg"]} w={["100%", "60%"]} boxShadow="2xl">
          <Heading textTransform="uppercase" mb={6} textAlign="center">Build VM</Heading>
          <form name="buildVM" ref={formRef}>
          <Box p={4} textTransform="uppercase">
          <FormControl id="vm-name" isRequired>
            <FormLabel textAlign="center" fontSize={["sm","md"]}>VM Name</FormLabel>
            <Input type="text" variant="flushed" onInput={handleChange} placeholder="VM Name" name="vmName" value={formData.vmName} textAlign="center"/>
          </FormControl>
          </Box>
          <Box p={4} textTransform="uppercase">
          <FormControl id="cluster-select" isRequired>
            <FormLabel textAlign="center" fontSize={["xs","md"]}>Cluster Selection</FormLabel>
            <Select placeholder="Select a Cluster" onInput={handleChange} name="clusterSelect" value={formData.clusterSelect}>
                {data?.data.cluster && data?.data.cluster.map(cluster => (
                   <option key={cluster.id}>{cluster.name}</option>
                ))}
              
            </Select>
          </FormControl>
          </Box>
          <Box p={4} textTransform="uppercase">
          <FormControl id="datastore-select" isRequired>
            <FormLabel textAlign="center" fontSize={["xs","md"]}>Datastore Selection</FormLabel>
            <Select placeholder="Select a Datastore" onChange={handleChange} name="datastoreSelect" value={formData.datastoreSelect}>
                {data?.data.ds && data?.data.ds.map(datastore => ( 
                  <option key={datastore.id}>{datastore.name}</option>
                ))}
              
            </Select>
          </FormControl>
          </Box>
          <Box p={4} textTransform="uppercase">
           <FormControl id="host-select" isRequired>
            <FormLabel textAlign="center" fontSize={["xs","md"]}>Host Selection</FormLabel>
            <Select placeholder="Select a Host" onChange={handleChange} name="hostSelect" value={formData.hostSelect}>
                {data?.data.hosts && data?.data.hosts.map(host => ( 
                    <option key={host.id}>{host.name}</option>
                ))}
              
              
            </Select>
          </FormControl>
          </Box>
          <Box p={4} textTransform="uppercase">
          <FormControl id="template-select" isRequired>
            <FormLabel textAlign="center" fontSize={["xs","md"]}>Select Template</FormLabel>
            <Select placeholder="Select a Template" onChange={handleChange} name="templateSelect" value={formData.templateSelect}>
                {data?.data.templates && data?.data.templates.map(template => ( 
                    <option key={template.id}>{template.name}</option>
                ))}
              
              
            </Select>
          </FormControl>
          </Box>
          </form>
      
          <Box d="flex" p={["0px","12px"]} alignItems="center" justifyContent="center">
            <Button mr={8} colorScheme="teal" 
            justifyContent="center" 
            textTransform="uppercase" 
            alignItems="center"
            variant="outline"
            onClick={handleReset}>
              Reset
            </Button>
            <Button colorScheme="teal" 
            textTransform="uppercase" 
            alignItems="center"
            variant="outline"
            onClick={handleClick}>
              Build!
            </Button>
          </Box>
          <Box overflow={["hidden"]} w={["100%"]} display={["none", "block"]}>
            <Code fontSize={["xs","md"]}>
              {payload && payload}
            </Code>
              
          </Box>
            
          </Flex>
          {/*)} */}
      </Flex>       
    )
}

export default BuildForm



//import { createServer } from "miragejs";


/*createServer({
  routes() {
    this.get("/api/v1/resources", () => ({
      cluster: [
        {
          id: 1,
          name: "LAB-CL"
        },
        {
          id: 2,
          name: "Nested-CL"
        },
        {
          id: 3,
          name: "domain-c1006"
        },
      ],
      ds: [
          {
              id: 4,
              name: "DS1"
          },
          {
              id: 5,
              name: "DS2"
          },
          {
              id: 6,
              name: "datastore-1013"
          }
      ],
      hosts: [
          {
              id: 7,
              name: "Host-1"
          },
          {
              id: 8,
              name: "Host-2"
          },
          {
              id: 9,
              name: "host-1012"
          }
      ],
      templates: [
          {
              id: 10,
              name: "Template-1"
          },
          {
              id: 11,
              name: "vm-3035"
          }
      ],
    }))
  },
})*/

// Old way
/* useEffect(() => {
  //setLoading(true);
  fetch('https://fabianbrash.npkn.net/vm-build-data')
  .then(res => res.json())
  .then(data => {
      setClusters(data.cluster);
      setDS(data.ds);
      setHosts(data.hosts);
      setTemplates(data.templates);
  }).catch(err => {
    setError(err);
  }).finally(() => {
    setLoading(false);
  })

},[]);*/


 /*useEffect(() => {
      setClusters(data?.data.cluster);
      setDS(data?.data.ds);
      setHosts(data?.data.hosts);
      setTemplates(data?.data.templates);
      
    }, [data])*/