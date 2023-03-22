import React from 'react';

interface IProps {
	error: string;
}

const Error = ({ error }: IProps) => {
	return <div>{error}</div>;
};

export default Error;
