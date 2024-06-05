import {
	Flex,
	useColorModeValue,
  theme,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import routes from '../../routes';
import { ColorModeSwitcher } from '../../theme/ColorModeSwitcher';
import { SidebarResponsive } from '../sidebar';

export default function SecNavbar(props) {
	const { secondary } = props;
	let menuBg = useColorModeValue('white', 'navy.800');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);

	return (
		<Flex
			w={{ sm: '100%', md: 'auto' }}
			alignItems="center"
			flexDirection="row"
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p="10px"
			borderRadius="30px"
			boxShadow={shadow}>
			<SidebarResponsive routes={routes} />
      <ColorModeSwitcher theme={theme} />
		</Flex>
	);
}

SecNavbar.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
