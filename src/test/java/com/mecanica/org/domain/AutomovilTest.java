package com.mecanica.org.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mecanica.org.web.rest.TestUtil;

public class AutomovilTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Automovil.class);
        Automovil automovil1 = new Automovil();
        automovil1.setId(1L);
        Automovil automovil2 = new Automovil();
        automovil2.setId(automovil1.getId());
        assertThat(automovil1).isEqualTo(automovil2);
        automovil2.setId(2L);
        assertThat(automovil1).isNotEqualTo(automovil2);
        automovil1.setId(null);
        assertThat(automovil1).isNotEqualTo(automovil2);
    }
}
