import cuid from 'cuid';
import { useCallback, useMemo, useState } from 'react';
import AddButton from './components/AddButton';
import AddRobotForm from './components/AddRobotForm';
import FormDialog from './components/FormDialog';
import RobotCard, { IRobot } from './components/RobotCard';
import SearchInput from './components/SearchInput';
import useLocalStorage from './hooks/useLocalStorage';

export const ROBOT_DATA_KEY = 'robot-data';

function App() {
  const [filter, setFilter] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [robotData, setRobotData] = useLocalStorage<IRobot[]>(
    ROBOT_DATA_KEY,
    []
  );

  const filteredRobots = useMemo(
    () =>
      robotData.filter((robot) =>
        robot.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, robotData]
  );

  const addRobotHandler = useCallback(
    ({ name, purpose }: IRobot) => {
      setRobotData((prevData) => [
        {
          id: cuid(),
          name,
          purpose,
        },
        ...prevData,
      ]);
    },
    [setRobotData]
  );

  const editRobotHandler = useCallback(
    (robotParam: IRobot) => {
      const updatedRobotsData = robotData.map((robot) => {
        if (robot.id === robotParam.id) {
          return robotParam;
        }
        return robot;
      });
      setRobotData(updatedRobotsData);
    },
    [robotData]
  );

  const deleteRobotHandler = useCallback(
    (robotId: string) => {
      const updatedRobotsData = robotData.filter(
        (robot) => robot.id !== robotId
      );
      setRobotData(updatedRobotsData);
    },
    [robotData]
  );

  return (
    <main className="mx-auto w-full md:w-11/12 lg:w-3/5 py-8 px-4 relative">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
        Robodeck
      </h1>
      <SearchInput filter={filter} setFilter={setFilter} />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pt-4">
        {filteredRobots.map((robot) => (
          <RobotCard
            robot={robot}
            key={robot.id}
            editRobot={editRobotHandler}
            deleteRobot={deleteRobotHandler}
          />
        ))}
      </div>
      <FormDialog open={open} setOpen={setOpen}>
        <AddRobotForm submitHandler={addRobotHandler} />
      </FormDialog>
      <AddButton handler={() => setOpen(true)} />
    </main>
  );
}

export default App;
