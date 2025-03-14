import { Button, ButtonGroup } from '@chakra-ui/react';
import './banner.css';

function Banner() {

    
    return (
        <div className="banner-container">
            {/* Overlay for the banner */}
            <div className="banner-overlay"></div>
            
            {/* Background of the banner */}
            <div className="banner-background">
                
                {/* Content of the banner */}
                <div className="banner-content">
                    <span className="banner-title">Not sure where to go? Perfect.</span>
                    
                    {/* Button group */}
                    <ButtonGroup variant="outline" spacing="6" className="button-group">
                        <Button colorScheme="blue" h={10} className="button-custom">I'm flexible</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
}

export default Banner;
