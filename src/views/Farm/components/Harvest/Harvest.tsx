import React, { useCallback, useState } from 'react'

import {
  Button,
  Card,
  CardActions,
  CardContent,
} from 'react-neu'

import HarvestModal from './components/HarvestModal'

const Harvest: React.FC = () => {
  const [harvestModalIsOpen, setHarvestModalIsOpen] = useState(false)

  const handleDismissHarvestModal = useCallback(() => {
    setHarvestModalIsOpen(false)
  }, [setHarvestModalIsOpen])

  const handleHarvestClick = useCallback(() => {
    setHarvestModalIsOpen(true)
  }, [setHarvestModalIsOpen])

  return (
    <>
      <Card>
        <CardContent>
        </CardContent>
        <CardActions>
          <Button
            full
            onClick={handleHarvestClick}
            text="Harvest"
          />
        </CardActions>
      </Card>
      <HarvestModal
        isOpen={harvestModalIsOpen}
        onDismiss={handleDismissHarvestModal}
      />
    </>
  )
}

export default Harvest