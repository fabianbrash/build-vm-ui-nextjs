import React, { useState, useEffect, useRef } from 'react'
import { Flex, Spacer,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input, Select, Box, Button, Heading, Code } from "@chakra-ui/react"
    import { createServer } from "miragejs";


createServer({
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
})


function BuildForm() {

    const [clusters, setClusters] = useState([]);
    const [cluster, setCluster] = useState('');
    const clusterRef = useRef();

    const [ds, setDS] = useState([]);
    const [datastore, setDatastore] = useState('');
    const datastoreRef = useRef();

    const [hosts, setHosts] = useState([]);
    const [host, setHost] = useState('');
    const hostRef = useRef();

    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState('');
    const templateRef = useRef();

    const [vm, setVM] = useState('');
    const vmRef = useRef();

    const [payload, setPayload] = useState('');


    useEffect(() => {
        fetch('/api/v1/resources')
        .then(res => res.json())
        .then(data => {
            setClusters(data.cluster);
            setDS(data.ds);
            setHosts(data.hosts);
            setTemplates(data.templates);
        })

    },[]);

    const handleChange = e => {
        console.log(e);
        const { name, value } = e.target;
        if(name === 'cluster-select') setCluster(value);
        if(name === 'datastore-select') setDatastore(value);
        if(name === 'host-select') setHost(value);
        if(name === 'template-select') setTemplate(value);
        if(name === 'vm-name') setVM(value );


        const payLoadData = {
            guest_customization_spec: {
                name: "Srv19"
            },
            name: vmRef.current.value,
            placement: {
                cluster: clusterRef.current.value,
                datastore: datastoreRef.current.value,
                host: hostRef.current.value
            },
            power_on: true,
            source: templateRef.current.value
        }

        setPayload(JSON.stringify(payLoadData),null, 1);

    }

    return (

        <Flex height="100vh" justifyContent="center" alignItems="center" w="100%" mb={20} mt={10}>
    
        <Flex direction="column" background="gray.100" p={20} rounded={6} w="60%" boxShadow="2xl">
        <Heading textTransform="uppercase" mb={6} textAlign="center">Build VM</Heading>
        <Box p={4} textTransform="uppercase">
        <FormControl id="vm-name" isRequired>
          <FormLabel textAlign="center">VM Name</FormLabel>
          <Input type="text" variant="flushed" onChange={handleChange} placeholder="VM Name" name="vm-name" value={vm} ref={vmRef} textAlign="center"/>
        </FormControl>
        </Box>
        <Box p={4} textTransform="uppercase">
        <FormControl id="cluster-select" isRequired>
          <FormLabel textAlign="center">Cluster Selection</FormLabel>
          <Select placeholder="Select a Cluster" onChange={handleChange} name="cluster-select" ref={clusterRef}>
              {clusters && clusters.map(cluster => (
                 <option key={cluster.id}>{cluster.name}</option>
              ))}
            
          </Select>
        </FormControl>
        </Box>
        <Box p={4} textTransform="uppercase">
        <FormControl id="datastore-select" isRequired>
          <FormLabel textAlign="center">Datastore Selection</FormLabel>
          <Select placeholder="Select a Datastore" onChange={handleChange} name="datastore-select" ref={datastoreRef}>
              {ds && ds.map(datastore => ( 
                <option key={datastore.id}>{datastore.name}</option>
              ))}
            
          </Select>
        </FormControl>
        </Box>
        <Box p={4} textTransform="uppercase">
         <FormControl id="host-select" isRequired>
          <FormLabel textAlign="center">Host Selection</FormLabel>
          <Select placeholder="Select a Host" onChange={handleChange} name="host-select" ref={hostRef}>
              {hosts && hosts.map(host => ( 
                  <option key={host.id}>{host.name}</option>
              ))}
            
            
          </Select>
        </FormControl>
        </Box>
        <Box p={4} textTransform="uppercase">
        <FormControl id="template-select" isRequired>
          <FormLabel textAlign="center">Select Template</FormLabel>
          <Select placeholder="Select a Template" onChange={handleChange} name="template-select" ref={templateRef}>
              {templates && templates.map(template => ( 
                  <option key={template.id}>{template.name}</option>
              ))}
            
            
          </Select>
        </FormControl>
        </Box>
    
        <Box d="flex" p={12} alignItems="center" justifyContent="center">
          <Button mr={8} colorScheme="teal" 
          justifyContent="center" 
          textTransform="uppercase" 
          alignItems="center"
          variant="outline">
            Reset
          </Button>
          <Button colorScheme="teal" 
          textTransform="uppercase" 
          alignItems="center"
          variant="outline">
            Build!
          </Button>
        </Box>
        <Box height="100px">
          <Code>
            {payload && payload}
          </Code>
            
        </Box>
          
        </Flex>
      </Flex>
            
      )
}

export default BuildForm
