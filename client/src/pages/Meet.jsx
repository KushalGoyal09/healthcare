import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect, useState } from 'react';
import DoctorRatingPopup from '../components/Rating';

const Meet = () => {

    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [unAuthorized, setUnAuthorized] = useState(false);
    const [showRating, setShowRating] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('patient')) {
            setName("Patient");
            setUserId(localStorage.getItem('patient'));
            setUnAuthorized(false);
        } else if (localStorage.getItem('doctor')) {
            setName("Doctor");
            setUserId(localStorage.getItem('doctor'));
            setUnAuthorized(false);
        } else {
            setUnAuthorized(true);
        }
    }, []);

    const { meetId } = useParams();

    const myMeeting = async (element) => {
        const appID = 1885114650;
        const serverSecret = "4ec764c97dc3cdfdc1662f89180ea024";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, meetId, userId, name);
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            maxUsers: 2,
            showRoomTimer: true,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            onLeaveRoom: () => {
                setShowRating(true);
            },
            onJoinRoom: () => {
                console.log('Join Room Success');
            }
        });
    };


    return (
        <>
            {unAuthorized ? (
                <div>
                    <h1>Unauthorized Access</h1>
                </div>) : (
                <div
                    ref={myMeeting}
                    style={{ width: '100vw', height: '100vh' }}
                ></div>
            )}
            {showRating && (
                <DoctorRatingPopup
                    doctorName="Dr. XYZ"
                    onSubmit={(doctorName, rating) => {
                        console.log(doctorName, rating);
                        window.location.href = "/";
                    }}
                />
            )}
        </>
    );
};


export default Meet;