-- Procedural_City_Builder.ms
-- Generates a randomized grid of skyscrapers with varying dimensions.

macroScript ProceduralCityBuilder category:"CreativeArchitect" tooltip:"Generate Sci-Fi City"
(
    rollout cityGen "Procedural City Builder"
    (
        spinner spRows "Grid Rows:" range:[1,100,10] type:#integer
        spinner spCols "Grid Cols:" range:[1,100,10] type:#integer
        spinner spSpacing "Spacing:" range:[10,1000,50] type:#float
        button btnGenerate "Build City" width:120 height:30
        
        on btnGenerate pressed do
        (
            undo "Build City" on
            (
                local rows = spRows.value
                local cols = spCols.value
                local spacing = spSpacing.value
                
                for r = 1 to rows do
                (
                    for c = 1 to cols do
                    (
                        local w = random 20.0 40.0
                        local d = random 20.0 40.0
                        local h = random 100.0 500.0
                        
                        -- Add chance for super tall buildings
                        if (random 1 100) > 90 then h = random 600.0 1200.0
                        
                        local b = box length:d width:w height:h
                        b.pos = [(r-1)*spacing, (c-1)*spacing, 0]
                        
                        -- Randomize wirecolor for immediate visual feedback
                        b.wirecolor = color (random 50 200) (random 50 200) (random 50 200)
                    )
                )
                print "City generated successfully."
            )
        )
    )
    createDialog cityGen 150 150
)
