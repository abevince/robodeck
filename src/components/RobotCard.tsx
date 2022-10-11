import { FC, useState } from 'react';
import slugify from 'slugify';
import EditRobotForm from './EditRobotForm';
import RobotCardMenu from './RobotCardMenu';

const AVATAR_BASE_URL = 'https://avatars.dicebear.com/api/bottts';

export interface IRobot {
  id?: string;
  name: string;
  purpose: string;
}

export interface IRobotCardProps {
  robot: IRobot;
  editRobot: (robot: IRobot) => void;
  deleteRobot: (robotId: string) => void;
}

const RobotCard: FC<IRobotCardProps> = ({ robot, editRobot, deleteRobot }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const avatarSeed = slugify(robot.name + robot.purpose, { lower: true });

  const editSubmitHandler = (robot: IRobot) => {
    editRobot(robot);
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg flex flex-col items-center justify-center bg-zinc-200 p-8 text-center relative">
      <RobotCardMenu
        setIsEditing={() => setIsEditing(true)}
        deleteRobot={() => deleteRobot(robot.id ?? '')}
      />
      <img
        src={`${AVATAR_BASE_URL}/${avatarSeed}.svg`}
        alt={avatarSeed}
        width={200}
        height={200}
      />
      {isEditing ? (
        <EditRobotForm robot={robot} submitHandler={editSubmitHandler} />
      ) : (
        <>
          <h3 className="text-xl font-bold">{robot.name}</h3>
          <p className="text-gray-700">{robot.purpose}</p>
        </>
      )}
    </div>
  );
};

export default RobotCard;
