import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography } from '@mui/joy';
import AppBarButton from './AppBarButton';
import { useContext } from 'react';
import { AuthContext } from '../layout';
import { AppBarContext } from '../page';
import { useRouter } from 'next/navigation';

export default function AppBar() {
    const authContext = useContext(AuthContext);
    const appBarContext = useContext(AppBarContext);
    const router = useRouter();

    const handleAppBarButtonClick = (index: number) => {
        appBarContext?.setSelectedAppBar(index);

        if (index == 3) {
            authContext?.handleLogout();
            appBarContext?.setSelectedAppBar(1);
        }
    }

    const handleUsernameButtonClick = () => {
        router.push("/settings");
    }
    
    return (
        <div className="appBar">
            <div className="profileDiv">
                <AccountCircleIcon style={{cursor: "pointer", fontSize: "2.5vw"}} />
                <Typography 
                    level="title-lg" 
                    style={{color: "white", cursor: "pointer", fontSize: "1.1vw"}}
                    onClick={handleUsernameButtonClick}
                >
                    {authContext?.displayName}
                </Typography>
            </div>
            <AppBarButton iconName="timeline" index={0} onClick={handleAppBarButtonClick} />
            <AppBarButton iconName="messages" index={1} onClick={handleAppBarButtonClick} />
            <AppBarButton iconName="contacts" index={2} onClick={handleAppBarButtonClick} />
            <div className="secondaryAppBarButtons">
                <AppBarButton iconName="logout" onClick={handleAppBarButtonClick} index={3} />
                <AppBarButton iconName="help" onClick={handleAppBarButtonClick} index={4} />
            </div>
        </div>
    );
}