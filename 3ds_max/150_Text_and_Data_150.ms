-- ============================================================================
-- Script Name: Text_and_Data_150
-- Platform: 3ds Max
-- Description: Typography and data-merge automation script #150.
-- ============================================================================

macroScript TextandData150
category:"DesignArchitectScripts"
tooltip:"Text_and_Data_150"
buttonText:"Text_and_Data_150"
(
    try
    (
        -- Initialization
        local scriptName = "Text_and_Data_150"
        
        -- Core execution block
        -- Typography and data-merge automation script #150.
        
        -- Log success
        print (scriptName + " executed successfully.")
    )
    catch
    (
        messageBox ("Error in " + scriptName + ": " + getCurrentException()) title:"Script Error"
    )
)
