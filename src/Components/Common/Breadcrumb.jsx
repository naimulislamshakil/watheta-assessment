import React from 'react';

const Breadcrumb = ({ firstValue, mainValue }) => {
	return (
		<div className="px-2 py-3 text-start">
			<h2 className="text-2xl font-bold">{firstValue}</h2>
			<p className="text-sm text-gray-600 mt-1 font-semibold">{mainValue}</p>
		</div>
	);
};

export default Breadcrumb;
