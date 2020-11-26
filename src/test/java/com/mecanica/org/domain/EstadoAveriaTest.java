package com.mecanica.org.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mecanica.org.web.rest.TestUtil;

public class EstadoAveriaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoAveria.class);
        EstadoAveria estadoAveria1 = new EstadoAveria();
        estadoAveria1.setId(1L);
        EstadoAveria estadoAveria2 = new EstadoAveria();
        estadoAveria2.setId(estadoAveria1.getId());
        assertThat(estadoAveria1).isEqualTo(estadoAveria2);
        estadoAveria2.setId(2L);
        assertThat(estadoAveria1).isNotEqualTo(estadoAveria2);
        estadoAveria1.setId(null);
        assertThat(estadoAveria1).isNotEqualTo(estadoAveria2);
    }
}
