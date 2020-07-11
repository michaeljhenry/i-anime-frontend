import React from 'react';


const nameContext = React.createContext({
 name: '',
 setNameFunction: () => {}
});

export default nameContext;