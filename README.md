# Germany Interactive in D3
###A sweetspot map for German refugees:

The data is in the TopoJson file. Data from the different data sources was merged with a GeoJson file via QGIS. Sadly the code is not broken down into separate components, and is still in a messy state. For the next stepper project, key components such as the keyforward/backwards elements could be reused, and d3 code can just be set up accordingly. 

###Application's State: 
The state listens to the Indexplay status. A much more advanced approach would be to create a state machine or making use of React's state support and props. 

To run, run a local python server: python -m SimpleHTTPServer 5000


###Tested: 
Application tested on mobile, Chrome and safari.