import React, { useState } from 'react'
import { genresList } from '../../workers/genresList'
import { Button } from 'baseui/button'
import { ButtonGroup } from 'baseui/button-group'
import { Grid, Cell } from 'baseui/layout-grid'


function BaseUiButtonGroup() {
    const [selected, setSelected] = React.useState([0, 1])

    return (
        <Grid> <ButtonGroup
            mode="checkbox"
            selected={selected}
            onClick={(event, index) => {
                if (!selected.includes(index)) {
                    setSelected([...selected, index]);
                } else {
                    setSelected(selected.filter(value => value !== index));
                }

                // alert({ elem })
            }}
        >
            {genresList.map((item, index) =>
                <Cell>
                    <Button key={index}>{item}</Button>
                </Cell>

            )}

        </ButtonGroup>
        </Grid>
    )
}

export default BaseUiButtonGroup



