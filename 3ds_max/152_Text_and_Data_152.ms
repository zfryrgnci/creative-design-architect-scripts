-- ============================================================================
-- Script Name: Text_and_Data_152
-- Platform: 3ds Max
-- Description: Typography and data-merge automation script #152.
-- ============================================================================

macroScript TextandData152
category:"DesignArchitectScripts"
tooltip:"Text_and_Data_152"
buttonText:"Text_and_Data_152"
(
    try
    (
        -- Initialization
        local scriptName = "Text_and_Data_152"
        
        -- Core execution block
        -- Typography and data-merge automation script #152.
        
        -- Log success
        print (scriptName + " executed successfully.")
    )
    catch
    (
        messageBox ("Error in " + scriptName + ": " + getCurrentException()) title:"Script Error"
    )
)
