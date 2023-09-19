import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Example from './Example';

const DragTest = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Example />
        </DndProvider>
    );
}

export default DragTest;